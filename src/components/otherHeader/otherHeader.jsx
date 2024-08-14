import React, { useEffect, useState } from "react";
import { Input } from "semantic-ui-react";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCart } from "../../pages/mainPage/Cart/CartContext";

import LogoLaranja from "../../assets/logo-laranja.png";

import "./otherHeader.css";

function OtherHeader({onClickProfile}) {
  const [isLogged, setIsLogged] = useState(false);
  const { toggleCartVisibility } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
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
        <FaShoppingCart className="cart-icon" onClick={toggleCartVisibility} />
        {isLogged ? (
          <FaRegUser className="profile" onClick={onClickProfile}/>
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
