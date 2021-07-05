import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer } from './reducers/productReducer';
import {productDetailReducer} from './reducers/productDetailReducer'
import { cartReducer } from './reducers/cartReducer';

const initialState = {
  cart:{
    cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
  }
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails:productDetailReducer,
  cart:cartReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;