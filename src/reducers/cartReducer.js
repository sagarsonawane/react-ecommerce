export const cartReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_CART":
            return action.payload;
        
        case "INCREASE_QTY":
            return state.map(item =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

        case "DECREASE_QTY":
            return state
                .map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0);

        case "ADD_TO_CART":
            //const existing = state.find(item => item.id === action.payload.id);
            if (state.find(item => item.id === action.payload.id)) {
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...state, { ...action.payload, quantity: 1 }];
            }

            case "REMOVE_FROM_CART":
                console.log("Removing item from cart:", action.payload.id);
                return state.filter(item => item.id !== action.payload.id);

            case "CLEAR_CART":
                console.log("Clearing cart");
                return [];

            default:
                return state;
    }
};

