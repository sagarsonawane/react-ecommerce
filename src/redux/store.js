import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { userReducer } from "./userSlice";
import productReducer from "./productSlice"; // ✅ Default import

//load peristed state from local storage

const savedCart = localStorage.getItem("cartItems");
const savedUser = localStorage.getItem("user");


const preloadedState = { 
  cart: savedCart ? JSON.parse(savedCart) : [] ,
  user: savedUser ? JSON.parse(savedUser) : { user: null, isAuthenticated: false }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer
  },
  preloadedState, // Use the preloaded state to initialize the store
});


store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cartItems", JSON.stringify(state.cart)); 
  localStorage.setItem("user", JSON.stringify(state.user));
}
);

export default store;