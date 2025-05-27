import useLocalStorage  from "../hooks/useLocalStorage";

function OrderHistory() {
    const [orderHistory] = useLocalStorage("orderHistory", []);

    if (!orderHistory || orderHistory.length === 0) {
        return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p>No orders found.</p>
            </div>
    );

    }

    const sortedOrders=[...orderHistory].reverse(); // Sort orders by date descending
                
    return (
        <div>
            <h2>Order History</h2>
            <ul>
                {sortedOrders.map((order, index) => (
                    <li key={index}>
                        <h3>Order {index + 1}</h3>
                        <p><strong>Placed On:</strong> {order.date}</p>
                        <p><strong>Name:</strong> {order.name}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        <p><strong>Address:</strong> {order.address}</p>
                        <h4>Cart Items</h4>
                        <ul>
                            {order.cartItems.map((item) => (
                                <li key={item.id}>
                                    {item.name} - ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                                </li>
                            ))}
                        </ul>
                        <h4>Total Amount: ₹{order.total}</h4>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderHistory;