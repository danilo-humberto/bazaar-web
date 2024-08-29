import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "semantic-ui-react";
import { useCart } from "../../pages/mainPage/Cart/CartContext";

import LogoLaranja from "../../assets/logo-laranja.png";

import "./otherHeader.css";

function OtherHeader({ onClickProfile }) {
  const [isLogged, setIsLogged] = useState(false);
  const { toggleCartVisibility } = useCart();
  const [profileImage, setProfileImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token) {
      setIsLogged(true);

      axios
        .get(`http://localhost:8080/api/usuario/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.imagemUrl) {
            setProfileImage(response.data.imagemUrl);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar imagem de perfil:", error);
        });
    } else {
      setIsLogged(false);
    }
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/searchPage?query=${encodeURIComponent(searchTerm)}`); // Redireciona para a SearchPage com o termo na URL
    }
  };

  return (
    <div className="new-background">
      <div>
        <Link to={"/"}>
          <img
            src={LogoLaranja}
            alt="logo do bazaar"
            width={170}
            height={170}
            loading="lazy"
          />
        </Link>
        <Input
          size="big"
          type="text"
          icon="search"
          placeholder="Digite aqui para pesquisar..."
          style={{ marginLeft: "20px", width: "400px", marginTop: '0px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // Redireciona ao pressionar Enter
            }
          }}
        />
      </div>

      <div>
        <FaShoppingCart
          className={`cart-icon ${!isLogged ? "disabled" : ""}`}
          onClick={isLogged ? toggleCartVisibility : null}
          style={{
            cursor: isLogged ? "pointer" : "not-allowed",
            opacity: isLogged ? 1 : 0.5,
          }}
        />
        <div className="count-products-cart">0</div>
        {isLogged ? (
          profileImage ? (
            <img
              src={profileImage}
              alt="Foto de Perfil"
              className="img-user"
              onClick={onClickProfile}
              style={{ cursor: "pointer" }}
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
