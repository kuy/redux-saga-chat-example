import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './reducers';
import saga from './sagas';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer, initialState, applyMiddleware(
      sagaMiddleware, logger()
    )
  );
  sagaMiddleware.run(saga);
  return store;
}
