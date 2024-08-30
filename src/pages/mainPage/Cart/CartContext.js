import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCartItems = [...cartItems];
    const index = updatedCartItems.findIndex(
      (item) => item.id === itemToRemove.id
    );

    if (index !== -1) {
      updatedCartItems.splice(index, 1); // Remove apenas a primeira ocorrência encontrada
      setCartItems(updatedCartItems);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.valorUnitario;
    }, 0);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <CartContext.Provider
      value={{
        isCartVisible,
        toggleCartVisibility,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
