/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "semantic-ui-react";
import { useCart } from "../../pages/mainPage/Cart/CartContext";

import LogoLaranja from "../../assets/logo-laranja.png";

import { AuthContext } from "../../context/AuthContext";
import { useAxios } from "../../hooks/useAxios";
import { notifySuccess } from "../../views/util/Util";
import "./otherHeader.css";

function OtherHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const { toggleCartVisibility } = useCart();
  const [profileImage, setProfileImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const navigate = useNavigate(); // Hook para navegação
  const { authState } = useContext(AuthContext);
  const { cartItems } = useCart();

  const { data } = useAxios(`http://localhost:8080/api/usuario/${authState.userId}`);
  useEffect(() => {
    if (authState.token) {
      setIsLogged(true);
      if(data) {
        setProfileImage(data.imagem)
      }
    } else {
      setIsLogged(false);
    }
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/searchPage?query=${encodeURIComponent(searchTerm)}`); // Redireciona para a SearchPage com o termo na URL
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("token");

    navigate(0);

    notifySuccess("Logout realizado com sucesso!");
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
        <div className="cart-container">
          <FaShoppingCart
            className={`cart-icon ${!isLogged ? "disabled" : ""}`}
            onClick={isLogged ? toggleCartVisibility : null}
            style={{
              cursor: isLogged ? "pointer" : "not-allowed",
              opacity: isLogged ? 1 : 0.5,
            }}
          />
          <div className="count-products-cart" style={{display: isLogged ? 'flex' : 'none'}}>{cartItems.length}</div>
        </div>
        {isLogged ? (
          profileImage ? (
            <img
              src={`http://localhost:8080/static/uploaded-imgs/${profileImage}`}
              alt="Foto de Perfil"
              className="img-user"
              onClick={() => setIsVisible(!isVisible)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <FaRegUser className="profile" onClick={() => setIsVisible(!isVisible)} />
          )
        ) : (
          <Link to={"/login"} style={{ color: "black" }}>
            <button className="btn-login">Entrar</button>
          </Link>
        )}
      </div>
      {isVisible && (
        <div className="pop-up">
              <Link to={"/profile"} style={{ color: "black" }}>
                <span>Ver perfil</span>
              </Link>
              <span
                style={{ color: "black", cursor: "pointer" }}
                onClick={handleLogout}
              >
                Sair
              </span>
          </div>
      )}
    </div>
  );
}

export default React.memo(OtherHeader);
