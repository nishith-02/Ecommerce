import React from 'react';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import {BrowserRouter,Route,Link} from 'react-router-dom'
import CartScreen from './Screens/CartScreen';
import { useSelector,useDispatch } from 'react-redux';
import SignIn from './Screens/SignInScreen';
import { SignOut } from './actions/userActions';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingAddress from './Screens/ShippingAdress';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import ProfileScreen from './Screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
function App() {
  const cart=useSelector(state=>state.cart)
  const dispatch=useDispatch()
  const {cartItems}=cart
  const userSignIn=useSelector(state=>state.userSignIn)
  const {userInfo}=userSignIn
  const signOutHandler=()=>{
    dispatch(SignOut())
  }
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">
            E-Commerce
          </Link>
        </div>
        <div>
          <Link to="/cart">Cart
          {cartItems.length>0&&
          <span className="badge">{cartItems.length}</span>
          }
          </Link>
          {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <a href="/" onClick={signOutHandler}>
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          
        </div>
      </header>
      <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/signin" component={SignIn}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddress}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeOrder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}
export default App