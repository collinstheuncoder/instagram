import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import authReducer from '../containers/auth/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form: reduxFormReducer,
});

export default rootReducer;
