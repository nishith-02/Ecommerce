import React, { useEffect } from 'react'
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useSelector,useDispatch } from 'react-redux';
const HomeScreen=()=>{
  const productList=useSelector(state=>state.productList)
  const{loading,error,products}=productList
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(listProducts())
  },[dispatch])
    return(
        <div>
          {loading?<LoadingBox/>:error?<MessageBox variant="danger">{error}</MessageBox>:
          (
          <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}/>
          ))}
        </div>)
          }
        </div>
          
    )
}
export default HomeScreen