import React, { useEffect, useState } from "react";
import { Input } from "semantic-ui-react";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCart } from "../../pages/mainPage/Cart/CartContext";
import axios from "axios";

import LogoLaranja from "../../assets/logo-laranja.png";

import "./otherHeader.css";

function OtherHeader({onClickProfile}) {
  const [isLogged, setIsLogged] = useState(false);
  const { toggleCartVisibility } = useCart();

  const getUserId = () => {
    const userId = localStorage.getItem("userId");
    console.log("userId obtido:", userId);
    return userId;
  };

  const UserData = async (setUserData) => {
    const userId = getUserId();

    if (!userId) {
      console.error("ID do usuário não encontrado");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/usuario/${userId}`
      );
      if (response.status === 200) {
        const userData = response.data;
        setUserData(userData);
      } else {
        console.error(
          "Erro ao buscar dados do usuário",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }

    UserData(setUserData)
  }, []);

  return (
    <div className="new-background">
      <div>
        <img src={LogoLaranja} alt="logo do bazaar" width={170} height={170} />
        <Input
          type="text"
          icon="search"
          placeholder="Digite aqui para pesquisar..."
          style={{ margin: "0", width: "350px", height: "50%" }}
        />
      </div>

      <div>
        <FaBell className="bell" />
        <FaShoppingCart className="cart-icon" onClick={toggleCartVisibility} />
        {isLogged ? (
          <div style={{height: '30px'}}>
            {userData && userData.imageUrl ? (
              <img 
                src={userData.imageUrl} 
                alt="imagem de perfil do usuario" 
                className="img-user"
                onClick={onClickProfile}
              />
            ) : (
              <FaRegUser className="profile" onClick={onClickProfile}/>
            )}
          </div>
        ) : (
          <Link to={"/login"} style={{ color: "black" }}>
            <button className="btn-login">
              Entrar
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default OtherHeader;
