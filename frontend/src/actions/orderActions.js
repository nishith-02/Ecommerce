import { CART_EMPTY, ORDER_CREATE_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_FAIL, ORDER_SUCCESS } from "../constants/orderConstants"
import Axios from 'axios'

export const createOrder=(order)=>async(dispatch,getState)=>{
        dispatch({type:ORDER_CREATE_REQUEST,payload:order})
        try{
            const {userSignIn:{userInfo}}=getState()
            const {data}=await Axios.post('/api/order',order,{
                headers: { Authorization: `Bearer ${userInfo.token}` },
            })
            dispatch({type:ORDER_SUCCESS,payload:data.order})
            dispatch({type:CART_EMPTY})
            localStorage.removeItem('cartItems')
        }
        catch(error){
            dispatch({type:ORDER_FAIL,payload:error.response&&error.response.data.message?error.respnse.data.message:error.message})
            console.log(error)
        }
}
export const detailsOrder=(orderId)=>async(dispatch,getState)=>{
    dispatch({type:ORDER_DETAILS_REQUEST,payload:orderId})
    const {userSignIn:{userInfo}}=getState()
    try{
        const {data}=await Axios.get(`/api/order/${orderId}`,{
            headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        dispatch({type:ORDER_DETAILS_SUCCESS,payload:data})
    }
    catch(error){
        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({type:ORDER_DETAILS_FAIL,payload:message})
    }
}