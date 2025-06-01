import "./App.css"
//import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CartContext from "./context/CartContext";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import OrderHistory from "./pages/OrderHistory";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import { logout } from "./redux/userSlice";
import RequireAuth from "./components/RequireAuth";
import ThankYou from "./pages/ThankYou";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  // const [cartItems1, setCartItems] = useLocalStorage("cartItems", []);
  //const { cartItems } = useCart();
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const addToCart = (product) => {
  //   setCartItems((prevItems) => {
  //     const existingItem = prevItems.find(item => item.id === product.id);
  //     if (existingItem) {
  //       return prevItems.map(item =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       )
  //     }
  //     else {
  //       return [...prevItems, { ...product, quantity: 1 }];
  //     }
  //   });
  // };

  // const decreaseQty = (productId) => {
  //   setCartItems((prevItems) =>
  //     prevItems
  //       .map(item =>
  //         item.id === productId
  //           ? { ...item, quantity: item.quantity - 1 }
  //           : item
  //       )
  //       .filter(item => item.quantity > 0)
  //   );
  // };

  // const increaseQty = (productId) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map(item =>
  //       item.id === productId
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item
  //     )
  //   );
  // }

  // const removeProduct = (productId) => {
  //   setCartItems((prevItems) =>
  //     prevItems.filter(item => item.id !== productId)
  //   );
  // }

  return (
    <div className="App">
      <header className="navbar">

        <h1>My E-commerce Site</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/cart">
            Cart🛒 ({cartCount})</Link>
          | <Link to="/order-history">Order History</Link>
          {isAuthenticated ? (
            <>
              <span>Welcome, {user.name}!</span>
              {/* //add a circular button for logout with inline styles */}
              <button onClick={() => dispatch(logout())} style={{ marginLeft: '10px', cursor: 'pointer', color: 'blue' }}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>

        {/* <div>Cart🛒 ({cartCount})</div> */}
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          <Route path="/checkout" element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>} />

          <Route path="/order-summary" element={
            <RequireAuth>
              <OrderSummary />
            </RequireAuth>
          } />
          <Route path="/order-history" element={
            <RequireAuth>
              <OrderHistory />
            </RequireAuth>}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000}/>
      </main>
    </div>
  );
}

export default App;