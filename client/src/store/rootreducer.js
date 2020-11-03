import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import currentUser from './auth'
import users from './users'
import chat from './chat'
import block from './block'





const rootReducer = combineReducers({
  currentUser,
  users, 
  chat,
  block
  //ADD ADDITIONAL SLICES OF STATE HERE 
});

export default rootReducer



