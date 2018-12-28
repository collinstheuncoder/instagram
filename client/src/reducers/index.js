import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import authReducer from '../containers/auth/reducer';
import usersReducer from '../containers/users/reducer';
import postsReducer from '../containers/posts/reducer';

const rootReducer = combineReducers({
  auth: authReducer,  
  users: usersReducer,  
  posts: postsReducer,
  form: reduxFormReducer,
});

export default rootReducer;
