import React, { useState } from "react";
import { Form, Input, FormField, Icon, Button } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

import "./LoginPage.css";
import axios from "axios";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [token, setToken] = useState("");
  const navigation = useNavigate()

  function salvar() {

    let user = {
      login: login,
      senha:senha
    }

    axios.post('http://localhost:8080/auth/login', user)
     .then((response) => {
        const tokenData = response.data.token;
        setToken(tokenData);
        localStorage.setItem('token', tokenData);
        console.log(tokenData);

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenData;
     })
     .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Header />
      <div className="container-login">
        <div className="background-login">
          <div className="content-login">
            <h1>Acesse a sua Conta</h1>
            <div className="form-content-login">
              <Form widths="equal" size="large">
                <FormField>
                  <label>Usuário</label>
                  <Input
                    iconPosition="left"
                    placeholder="usuario"
                    type="text"
                    style={{ margin: "0" }}
                  >
                    <Icon name="user" />
                    <input
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                    />
                  </Input>
                </FormField>
                <FormField>
                  <label>Senha</label>
                  <Input
                    iconPosition="left"
                    placeholder="Senha"
                    type="password"
                    style={{ margin: "0" }}
                  >
                    <Icon name="lock" />
                    <input
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </Input>
                </FormField>
              </Form>
              <Button
                color="orange"
                circular
                size="medium"
                style={{ color: "black", marginTop: "5%" }}
                onClick={salvar()}
              >
                Entrar
              </Button>
            </div>
            <div className="haveAcount">
              <p>Não tem uma conta?</p>
              <Link to={"/register-page"}>Cadastre-se</Link>
            </div>
            <span className="forgotPassword"><Link to={"/forgotPassword"} style={{color: 'red'}}>Esqueceu sua senha?</Link></span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
