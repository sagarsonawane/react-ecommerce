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
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.id}
                                    className="border rounded-lg p-4 flex items-center justify-between bg-white shadow">
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {item.name} - ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                                        </h3>
                                    </div>
                                    <button onClick={() => dispatch(increaseQty(item.id))}
                                     className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded">
                                        +
                                    </button>
                                    <button onClick={() => dispatch(decreaseQty(item.id))}
                                     className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded">
                                        -
                                    </button>
                                    <button onClick={() => dispatch(removeFromCart(item.id))}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <p style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
                            Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                        </p>
                        {/* <button onClick={() => alert("Proceeding to checkout...")} style={{ marginTop: '20px' }}> */}

                        <div className="mt-6 flex justify-between items-center">
                            <Link to="/checkout"
                             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                                Checkout
                            </Link>
                            {/* </button> */}
                            <button onClick={() => dispatch(clearCart())}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                                    Clear Cart</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;