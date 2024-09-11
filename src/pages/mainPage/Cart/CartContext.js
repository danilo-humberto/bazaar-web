import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { notifyError } from "../../../views/util/Util";

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

    const getIdUserFromProduct = await axios.get(`http://localhost:8080/api/produto/obterUsuario/${product.id}`)

    if(getIdUserFromProduct.data.id == authState.userId){
      notifyError("Você não pode adicionar o seu próprio produto no carrinho!")
      return
    }
  
    const response = await axios.get(
      `http://localhost:8080/api/carrinho/cartId/${authState.userId}`
    );

    
    if (response.status === 204) {
      await axios.post(
        `http://localhost:8080/api/carrinho/${authState.userId}`
      );
    }


    const getIdCart = await axios.get(
      `http://localhost:8080/api/carrinho/cartId/${authState.userId}`
    );

    const resAddItemCart = await axios.put(
      `http://localhost:8080/api/carrinho/add/${getIdCart.data}/${product.id}`
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

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const clearCart = () => {
    setCartItems([]); // Limpa o estado local do carrinho
    localStorage.removeItem("cartItems"); // Remove os itens do localStorage
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
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
