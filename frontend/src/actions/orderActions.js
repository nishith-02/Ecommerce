import { CART_EMPTY, ORDER_CREATE_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_FAIL, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_SUCCESS } from "../constants/orderConstants"
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

export const payOrder=(order,paymentOrder)=>async(dispatch,getState)=>{
    dispatch({type:ORDER_PAY_REQUEST,payload:{order,paymentOrder}})
    const {userSignIn:{userInfo}}=getState()
    try{
        const {data}=await Axios.put(`/api/order/${order._id}/pay`,paymentOrder,{
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({type:ORDER_PAY_SUCCESS,payload:data})
    }
    catch(error){
        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({type:ORDER_PAY_FAIL,payload:message})
    }
}

export const listOrder=()=>async(dispatch,getState)=>{
    dispatch({type:ORDER_LIST_REQUEST})
    const {userSignIn:{userInfo}}=getState()
    try{
        const {data}=await Axios.get('/api/order/mine',{
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({type:ORDER_LIST_SUCCESS,payload:data})
    }
    catch(error){
        console.log(error.message)
        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({type:ORDER_LIST_FAIL,payload:message})
    }
}