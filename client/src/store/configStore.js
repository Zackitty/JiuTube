import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './rootreducer'
import storage from 'redux-persist/lib/storage' 
import AsyncStorage from '@react-native-community/async-storage';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = { // configuration object for redux-persist
  key: 'root',
  storage: AsyncStorage, // define which storage to use
}

const persistedReducer = persistReducer(persistConfig, rootReducer) 


 const store =  createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk)),
  );

const persistor = persistStore(store)

export {store, persistor}