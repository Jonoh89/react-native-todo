import { applyMiddleware, createStore, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import netInfo from './netInfo/reducer';
import tasks from './tasks/reducer';
import Firebase from 'firebase';
const firebase = new Firebase('https://react-todo-test.firebaseio.com/');

const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

const reducers = combineReducers({
  netInfo,
  tasks,
});

const middleware = [
  injectMiddleware({
    firebase,
  }),
  promiseMiddleware({
    promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
  }),
];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: true,
  });
  middleware.push(logger);
}

export default applyMiddleware(...middleware)(createStore)(reducers);
