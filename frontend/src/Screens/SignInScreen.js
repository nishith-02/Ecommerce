import React, { useState,useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { signIn } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
const SignIn=(props)=> {
  const dispatch=useDispatch()
  const history=useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect=props.location.search?props.location.search.split('=')[1]:'/'
  const userSignIn=useSelector(state=>state.userSignIn)
  const {userInfo,loading,error}=userSignIn
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email,password))
  };
  useEffect(()=>{
    if(userInfo){
        history.push(redirect)
    }
  },[userInfo,redirect,history])
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading&&<LoadingBox></LoadingBox>}
        {error&&<MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
export default SignIn