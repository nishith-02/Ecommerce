import React from 'react';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import {BrowserRouter,Route,Link} from 'react-router-dom'
import CartScreen from './Screens/CartScreen';
import { useSelector,useDispatch } from 'react-redux';
import SignIn from './Screens/SignInScreen';
import { SignOut } from './actions/userActions';
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
            amazona
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
                    <Link to="#logout" onClick={signOutHandler}>
                      Sign Out
                    </Link>
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
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}
export default App