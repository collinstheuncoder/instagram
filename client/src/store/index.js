import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

function configureStore() {
  return {
    ...createStore(
      rootReducer,
      compose(
        applyMiddleware(logger, thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      )
    ),
  };
}

export default configureStore;
