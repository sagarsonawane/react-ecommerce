import { createContext, useContext, useReducer, useEffect } from 'react';
import { cartReducer } from '../reducers/cartReducer';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, dispatch] = useReducer(cartReducer, []);

    //load cart from the local storage for first time
    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            dispatch({ type: 'LOAD_CART', payload: JSON.parse(storedCart) });
        }
    }, []);

    //save cart to the local storage whenever it changes
    useEffect(() =>{
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export default CartContext;