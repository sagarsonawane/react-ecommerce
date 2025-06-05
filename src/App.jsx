// import "./App.css"
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css';

function App() {

  // const [cartItems1, setCartItems] = useLocalStorage("cartItems", []);
  //const { cartItems } = useCart();
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">My E-Commerce Site</h1>
          <nav className="space-x-6">
            <Link to="/" className="hover:text-yellow-400">Home</Link> | <Link to="/cart" className="relative group">
              Cart🛒 <span className="absolute -top-2 -right-3 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span></Link>
            | <Link to="/order-history">Order History</Link>
            {isAuthenticated ? (
              <>
                <span>Welcome, {user.name}!</span>
                {/* //add a circular button for logout with inline styles */}
                <button onClick={() => dispatch(logout())} style={{ marginLeft: '10px', cursor: 'pointer', color: 'blue' }}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="hover:text-yellow-400">Login</Link>
            )}
          </nav>
        </div>

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
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
}

export default App;