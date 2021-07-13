import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer } from './reducers/productReducer';
import {productDetailReducer} from './reducers/productDetailReducer'
import { cartReducer } from './reducers/cartReducer';
import { userDetailsReducer, userRegisterReducer, userSignInReducer, userUpdateProfileReducer } from './reducers/userReducer';
import { orderCreateReducer, orderDeatilsReducer, orderListReducer, orderPayReducer } from './reducers/orderReducer';
const initialState = {
  userSignIn:{
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
  },
  cart:{
    cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
    shippingAddress:localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{fullName:'', address:'', city:'', postalCode:'', country:''}
  }
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails:productDetailReducer,
  cart:cartReducer,
  userSignIn:userSignInReducer,
  userRegister:userRegisterReducer,
  orderCreate:orderCreateReducer,
  orderDetails:orderDeatilsReducer,
  orderPay:orderPayReducer,
  orderList:orderListReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userUpdateProfileReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;