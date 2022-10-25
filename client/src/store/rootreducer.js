import { combineReducers } from 'redux';
import currentUser from './auth'
import users from './users'
import chat from './chat'






const rootReducer = combineReducers({
  currentUser,
  users,
  chat
  //ADD ADDITIONAL SLICES OF STATE HERE 
});

export default rootReducer



