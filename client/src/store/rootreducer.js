import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import currentUser from './auth'
import users from './users'
import chat from './chat'
import { persistStore, persistReducer } from 'redux-persist'




const rootReducer = combineReducers({
  currentUser,
  users, 
  chat
  //ADD ADDITIONAL SLICES OF STATE HERE 
});

export default rootReducer



