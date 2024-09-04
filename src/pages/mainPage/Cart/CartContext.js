import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { authState } = useContext(AuthContext);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (product) => {
    const response = await axios.get(
      `http://localhost:8080/api/carrinho/cartId/${authState.userId}`
    );

    if (!response.data) {
      await axios.post(
        `http://localhost:8080/api/carrinho/${authState.userId}`
      );
    }

    const resAddItemCart = await axios.put(
      `http://localhost:8080/api/carrinho/add/${response.data}/${product.id}`
    );

    if (resAddItemCart.status === 200) {
      setCartItems((prevItems) => [...prevItems, product]);
    }
  };

  const removeFromCart = async (itemToRemove) => {
    const response = await axios.get(
      `http://localhost:8080/api/carrinho/cartId/${authState.userId}`
    );

    const resRemove = await axios.put(
      `http://localhost:8080/api/carrinho/remove/${response.data}/${itemToRemove.id}`
    );

    if (resRemove.status === 200) {
      const updatedCartItems = [...cartItems];
      const index = updatedCartItems.findIndex(
        (item) => item.id === itemToRemove.id
      );

      if (index !== -1) {
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
      }
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.valorUnitario;
    }, 0);
  };

  const cleanCart = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/carrinho/cartId/${authState.userId}`
    );

    const resCleanCart = await axios.put(`http://localhost:8080/api/carrinho/clean/${response.data}`)

    if(resCleanCart.status === 200) {
      setCartItems([]);
    }
  }

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
        cleanCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
