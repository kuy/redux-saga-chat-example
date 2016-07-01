import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import {
  login, logout, addUser, removeUser, newMessage, connecting
} from './actions';

const initial = {
  app: {
    username: null,
    connecting: false
  },
  users: {},
  messages: {
    list: [],
    entities: {}
  },
};

const app = createReducer({
  [login]: (state, payload) => {
    return { ...state, username: payload.username };
  },
  [logout]: (state, payload) => {
    return { ...state, username: null, connecting: false };
  },
  [connecting]: (state, payload) => {
    return { ...state, connecting: payload.connecting };
  },
}, initial.app);

const users = createReducer({
  [addUser]: (state, payload) => {
    return { ...state, [payload.username]: true };
  },
  [removeUser]: (state, payload) => {
    const newState = { ...state };
    delete newState[payload.username];
    return newState;
  }
}, initial.users);

const messages = createReducer({
  [newMessage]: (state, payload) => {
    const { message } = payload;
    return {
      ...state,
      list: [ ...state.list, message.id ],
      entities: { ...state.entities, [message.id]: message }
    };
  }
}, initial.messages);

export default combineReducers(
  { app, users, messages }
);
