import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { userReducer } from "./userSlice";

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

// The store is configured with a single reducer, cartReducer, which manages the state of the shopping cart.
// This setup allows for easy management of the cart state across the application using Redux Toolkit's configureStore function.    
// The store can be used in the application by providing it to the Redux Provider component, allowing components to access the cart state and dispatch actions to modify it.
// The store is created using Redux Toolkit's configureStore function, which simplifies the setup process and provides good defaults for development.
// The store can be imported and used in the main application file (e.g., index.js) to provide the Redux store to the React application using the Provider component from react-redux.
// The store can be used in the application by wrapping the root component with the Provider component from react-redux and passing the store as a prop.


