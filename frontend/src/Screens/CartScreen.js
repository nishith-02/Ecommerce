import React, { useEffect } from "react";
import { addtoCart,removeFromCart } from "../actions/CartActions";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom"
const CartScreen = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const history=useHistory()
  useEffect(() => {
    if (productId) {
      dispatch(addtoCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler=(id)=>{
    dispatch(removeFromCart(id))
  }
  const checkoutHandler=()=>{
    history.push('/signin?redirect=shipping')
  }
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty
            <Link to="/"> Go to Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addtoCart(item.product,
                          Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                      ${item.price}
                  </div>
                  <div>
                      <button type="button" onClick={()=>removeFromCartHandler(item.product)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length>0?<Link to="/"> Go to Shopping</Link>:null}
      </div>
      <div className="col-1">
          <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Subtotal({cartItems.reduce((a,c)=>a+c.qty,0)} items):$
                                {cartItems.reduce((a,c)=>a+c.price*c.qty,0)}
                                </h2>
                            </li>
                            <li>
                                <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length===0}>
                                    Proceed to Checkout
                                </button>
                            </li>
                        </ul>
          </div>
      </div>
    </div>
  );
};
export default CartScreen;
