// src/pages/Cart.jsx
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart, clearCart } from "../redux/cartSlice";

const Cart = () => {
    //const { cartItems, increaseQty, decreaseQty, removeProduct, setCartItems } = useContext(CartContext);
    //const {cartItems, dispatch} = useCart();
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();


    return (
        <>
            <h2>Your cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                {item.name} - ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                                <button onClick={() => dispatch(increaseQty(item.id))} style={{ marginLeft: '10px' }}>
                                    +
                                </button>
                                <button onClick={() => dispatch(decreaseQty(item.id))} style={{ marginLeft: '10px' }} disabled={item.quantity === 1}>
                                    -
                                </button>
                                {/* <button onClick={() => dispatch({type:"REMOVE_FROM_CART", payload: {id: item.id}})} style={{ marginLeft: '10px' }}>
                                    Remove
                                </button> */}
                                <button onClick={() => dispatch(removeFromCart(item.id))} style={{ marginLeft: '10px' }}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
                        Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                    </p>
                    {/* <button onClick={() => alert("Proceeding to checkout...")} style={{ marginTop: '20px' }}> */}
                        <Link to="/checkout">Checkout
                        </Link>
                    {/* </button> */}
                    <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
                </>
            )}
        </>
    );
};

export default Cart;
