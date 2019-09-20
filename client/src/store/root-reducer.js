import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import authReducer from './auth/reducer';
import usersReducer from './users/reducer';
import postsReducer from './posts/reducer';

const rootReducer = combineReducers({
  auth: authReducer,  
  users: usersReducer,  
  posts: postsReducer,
  form: reduxFormReducer,
});

export default rootReducer;
 