import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user';
import products from './products';
// import cart from './cart';
import orders from './orders';
import admin from './admin';

const reducer = combineReducers({user, products, orders, admin})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store;
export * from './user';
export * from './products';
//Not sure which are needed
//export * from './cart';
export * from './orders';
export * from './admin';
