import React, { useContext, useState } from "react";
import {
  Form,
  Input,
  FormField,
  Icon,
  Button,
  Loader,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import { notifyError, notifySuccess } from "../../views/util/Util";

import "./LoginPage.css";
import axios from "axios";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [loginInput, setLoginInput] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  function salvar() {
    let user = {
      username: loginInput,
      password: senha,
    };

    setLoading(true);
    axios
      .post("http://localhost:8080/api/usuario/login", user)
      .then((response) => {
        console.log(response.data);

        if (
          response.status === 200 &&
          response.data.token !== "Acesso negado"
        ) {
          login(response.data.token, response.data.login, response.data.userId);
          setLoading(false);
          notifySuccess("Logado com Sucesso!");
          setLoginInput("");
          setSenha("");
          navigation("/");
        } else {
          notifyError("Login ou senha Inválidos!");
          setLoading(false);
          setSenha("");
        }
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
              <Form widths="equal" size="large" onSubmit={salvar}>
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
                      value={loginInput}
                      onChange={(e) => setLoginInput(e.target.value)}
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
                <Button
                  color="orange"
                  circular
                  size="medium"
                  style={{ color: "black", marginTop: "0px", width: '100%' }}
                  onClick={salvar}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader active inline inverted size="tiny" />
                  ) : (
                    <span style={{ color: "black" }}>Entrar</span>
                  )}
                </Button>
              </Form>
            </div>
            <div className="haveAcount">
              <p>Não tem uma conta?</p>
              <Link to={"/register"}>Cadastre-se</Link>
            </div>
            <span className="forgotPassword">
              <Link to={"/forgotPassword"} style={{ color: "red" }}>
                Esqueceu sua senha?
              </Link>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
