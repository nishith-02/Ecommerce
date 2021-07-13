import React,{useState} from "react";
import CheckOutSteps from "../components/CheckOutSteps";
import {useDispatch, useSelector} from 'react-redux'
import { savePaymentMethod } from "../actions/CartActions";
const PaymentMethodScreen = (props) => {
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    if(!shippingAddress.address){
        props.history.push('/shipping')
    }
    const[paymentMethod,setPaymentMethod]=useState('')
    const dispath=useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault()
        dispath(savePaymentMethod(paymentMethod))
        props.history.push('/placeOrder')
    }
  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
            <button className="primary" type="submit" disabled={paymentMethod===''}>Continue</button>
        </div>
      </form>
    </div>
  );
};
export default PaymentMethodScreen;
