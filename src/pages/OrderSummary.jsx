//import { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
//import uselocalstorage from "../hooks/useLocalStorage";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function OrderSummary() {

    //const [shippingInfo ] = uselocalstorage("shippingInfo", null);
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const order = location.state?.order || {};

    const confirmOrder = async () => {
        try {
            const response = await fetch("http://localhost:5231/api/orders", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(order)
            });

            const result = await response.json();
            if (response.ok) {
                //alert("Order placed successfully!");
                toast.success("Order placed successfully!",
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    }
                );
                // Clear cart and shipping info
                dispatch(clearCart());
                navigate("/thank-you");
            }
            else {
                alert("Failed to place order: " + result.message);
            }
        }
        catch (error) {
            console.error("Error placing order:", error);
            alert("An error occurred while placing the order. Please try again.");
        }
    };

    
    // const handleConfirmOrder = () => {
    //     console.log("Order confirmed with the following details:");
    //     // Future: Send data to server
    //     //store the confirmed order in the order history. Existing order history should be prevailded and new one should be added to it.
    //     const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    //     orderHistory.push({
    //         name: shippingInfo.name,
    //         email: shippingInfo.email,
    //         phone: shippingInfo.phone,
    //         address: shippingInfo.address,
    //         cartItems: cartItems,
    //         total: total,
    //         date: new Date().toLocaleString()
    //     }); 
    //     localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
    //     // Clear cart and shipping info
    //     localStorage.removeItem("shippingInfo");
    //     dispatch(clearCart());
    //     alert("Order placed successfully!");
    //     window.location.href = "/";
    // };

    if(!order) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Order Summary</h2>
            <h3>Shipping Information</h3>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>

            <h3>Cart Items</h3>
            <ul>
                {order.items.map((item) => (
                    <li key={item.id}>
                        {item.name} - ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                    </li>
                ))}
            </ul>

            <h3>Total Amount: ₹{total}</h3>

            <button onClick={confirmOrder}>✅ Confirm Order</button>
        </div>
    );
}

export default OrderSummary;    