import React, { useState,useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
const RegisterScreen=(props)=> {
  const dispatch=useDispatch()
  const history=useHistory()
  const [email, setEmail] = useState('');
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const redirect=props.location.search?props.location.search.split('=')[1]:'/'
  const userRegister=useSelector(state=>state.userRegister)
  const {userInfo,loading,error}=userRegister
  const submitHandler = (e) => {
    e.preventDefault();
    if(password!==confirmpassword){
        alert('Password and confirm password does not match')
    }
    else{
        dispatch(register(name,email,password))
    }
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
          <h1>Create Account</h1>
        </div>
        {loading&&<LoadingBox></LoadingBox>}
        {error&&<MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setname(e.target.value)}
          ></input>
        </div>
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confimPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an Account? <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
export default RegisterScreen