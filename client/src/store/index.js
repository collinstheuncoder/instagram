import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

function configureStore() {
  return {
    ...createStore(
      rootReducer,
      composeWithDevTools(),
      applyMiddleware(logger, thunk)
    ),
  };
}

export default configureStore;
