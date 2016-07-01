import io from 'socket.io-client';
import { eventChannel, END } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
  login, logout, addUser, removeUser, newMessage, sendMessage,
  connecting, ws_disconnected
} from './actions';

function connect() {
  const socket = io('http://localhost:3000', {
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax': 5000,
    'reconnectionAttempts': 5
  });
  return new Promise((resolve, reject) => {
    socket.on('connect', () => {
      resolve(socket);
    });
    socket.on('reconnect_failed', (err) => {
      reject(new Error('ws:reconnect_failed '))
    });
  }).then(
    response => ({ socket: response })
    ).catch(
    error => ({ socket, error })
    );
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('users.login', ({ username }) => {
      emit(addUser({ username }));
    });
    socket.on('users.logout', ({ username }) => {
      emit(removeUser({ username }));
    });
    socket.on('messages.new', ({ message }) => {
      emit(newMessage({ message }));
    });
    socket.on('disconnect', e => {
      emit(END)
    });
    return () => { };
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  try {
    while (true) {
      let action = yield take(channel);
      yield put(action);
    }
  }
  finally {
    yield put(ws_disconnected())
  }
}

function* write(socket) {
  try {
    while (true) {
      const { payload } = yield take(`${sendMessage}`);
      socket.emit('message', payload);
    }
  }
  finally {

  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow(username) {
  try {
    while (true) {
      yield put(connecting({ connecting: true }));
      const { socket, error } = yield call(connect);
      yield put(connecting({ connecting: false }));

      if (error) {
        yield call([socket, socket.disconnect]);
        yield put(logout());
        break;
      }

      if (socket) {
        socket.emit('login', { username });

        const task = yield fork(handleIO, socket);

        let action = yield take([`${logout}`, `${ws_disconnected}`]);
        yield cancel(task);
        socket.emit('logout');
        yield call([socket, socket.disconnect]);
        if (action.type == logout().type) {
          break;
        }
      }
    }
  }
  finally {

  }
}

export default function* rootSaga() {
  let myFlow;
  while (true) {
    let {payload} = yield take(`${login}`);
    if (myFlow) {
      yield cancel(myFlow);
    }
    myFlow = yield fork(flow, payload.username);
  }
}
