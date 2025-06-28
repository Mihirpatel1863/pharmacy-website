import React, { createContext, useReducer, useContext, useEffect } from 'react';


const CartContext = createContext();


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload], 
      };
    case 'CLEAR_ORDERS':
      return {
        ...state,
        orders: [],
      };
    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

  const [state, dispatch] = useReducer(cartReducer, {
    cart: storedCart,
    orders: storedOrders,
  });

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('orders', JSON.stringify(state.orders));
  }, [state.cart, state.orders]);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);
