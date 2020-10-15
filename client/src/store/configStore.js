import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import currentUser from './auth'
import users from './users'
import chat from './chat'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
}
const reducer = combineReducers({
  currentUser,
  users, 
  chat
  //ADD ADDITIONAL SLICES OF STATE HERE 
});

const persistedReducer = persistReducer(persistConfig, reducer)

const configStore = (initialState) => {
  let store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
  let persistor = persistStore(store)
  return {store, persistor}
};

export default configStore;