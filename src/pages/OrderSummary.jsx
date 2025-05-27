//import { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
import uselocalstorage from "../hooks/useLocalStorage";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

function OrderSummary() {

    const [shippingInfo ] = uselocalstorage("shippingInfo", null);
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleConfirmOrder = () => {
        console.log("Order confirmed with the following details:");
        // Future: Send data to server
        //store the confirmed order in the order history. Existing order history should be prevailded and new one should be added to it.
        const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
        orderHistory.push({
            name: shippingInfo.name,
            email: shippingInfo.email,
            phone: shippingInfo.phone,
            address: shippingInfo.address,
            cartItems: cartItems,
            total: total,
            date: new Date().toLocaleString()
        }); 
        localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
        // Clear cart and shipping info
        localStorage.removeItem("shippingInfo");
        dispatch(clearCart());
        alert("Order placed successfully!");
        window.location.href = "/";
    };

    if(!shippingInfo) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Order Summary</h2>
            <h3>Shipping Information</h3>
            <p><strong>Name:</strong> {shippingInfo.name}</p>
            <p><strong>Email:</strong> {shippingInfo.email}</p>
            <p><strong>Phone:</strong> {shippingInfo.phone}</p>
            <p><strong>Address:</strong> {shippingInfo.address}</p>

            <h3>Cart Items</h3>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                    </li>
                ))}
            </ul>

            <h3>Total Amount: ₹{total}</h3>

            <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
    );
}

export default OrderSummary;    