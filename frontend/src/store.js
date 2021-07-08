import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer } from './reducers/productReducer';
import {productDetailReducer} from './reducers/productDetailReducer'
import { cartReducer } from './reducers/cartReducer';
import { userRegisterReducer, userSignInReducer } from './reducers/userReducer';

const initialState = {
  userSignIn:{
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
  },
  cart:{
    cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
  }
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails:productDetailReducer,
  cart:cartReducer,
  userSignIn:userSignInReducer,
  userRegister:userRegisterReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;