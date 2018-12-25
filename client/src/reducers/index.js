import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import authReducer from '../containers/auth/reducer';
import usersReducer from '../containers/users/reducer';

const rootReducer = combineReducers({
  auth: authReducer,  
  users: usersReducer,
  form: reduxFormReducer,
});

export default rootReducer;
