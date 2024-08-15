import React, { useEffect, useState } from "react";
import { Input } from "semantic-ui-react";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCart } from "../../pages/mainPage/Cart/CartContext";
import axios from "axios";

import LogoLaranja from "../../assets/logo-laranja.png";

import "./otherHeader.css";

function OtherHeader({ onClickProfile }) {
  const [isLogged, setIsLogged] = useState(false);
  const { toggleCartVisibility } = useCart();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token) {
      setIsLogged(true);

      // Faz a requisição para obter os dados do usuário e a imagem de perfil
      axios
        .get(`http://localhost:8080/api/usuario/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.imagemUrl) {
            setProfileImage(response.data.imagemUrl); // Define a URL da imagem de perfil
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar imagem de perfil:", error);
        });
    } else {
      setIsLogged(false);
    }
  }, []);

  return (
    <div className="new-background">
      <div>
        <img src={LogoLaranja} alt="logo do bazaar" width={170} height={170} loading="lazy"/>
        <Input
          type="text"
          icon="search"
          placeholder="Digite aqui para pesquisar..."
          style={{ margin: "0", width: "350px", height: "50%" }}
        />
      </div>

      <div>
        <FaShoppingCart className="cart-icon" onClick={toggleCartVisibility} />
        {isLogged ? (
          profileImage ? (
            <img
              src={profileImage}
              alt="Foto de Perfil"
              className="img-user"
              onClick={onClickProfile}
              style={{cursor: 'pointer'}}
            />
          ) : (
            <FaRegUser className="profile" onClick={onClickProfile} />
          )
        ) : (
          <Link to={"/login"} style={{ color: "black" }}>
            <button className="btn-login">Entrar</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default OtherHeader;
