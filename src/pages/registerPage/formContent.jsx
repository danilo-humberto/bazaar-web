import axios from "axios";
import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormInput,
  Container,
  Button,
  Loader,
} from "semantic-ui-react";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";


export default function FormContent() {
  const [nomeCompleto, setNomeCompleto] = useState();
  const [email, setEmail] = useState();
  const [login, setLogin] = useState();
  const [senha, setSenha] = useState();
  const [confirmarSenha, setConfirmarSenha] = useState();
  const [cpf, setCpf] = useState();
  const [numeroTelefone, setNumeroTelefone] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  function salvar() {
    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    let usuarioRequest = {
      nomeCompleto: nomeCompleto,
      email: email,
      login: login,
      senha: senha,
      cpf: cpf,
      numeroTelefone: numeroTelefone,
    };

    setLoading(true);
    axios
      .post("http://localhost:8080/auth/register", usuarioRequest)
      .then((response) => {
        setLoading(false);
        const token = response.data.token;
        localStorage.setItem('token', token);
        toast.warning(
          "Confirme seu cadastro pelo código enviado para o seu e-mail!",
          {
            position: "top-right",
            autoClose: 2000,
          }
        );
        navigate('/activation')
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Falha no Cadastro!", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  }

  return (
    <div className="content-form">
      <Container textAlign="center">
        <h1>Crie a Sua Conta</h1>
        <div className="container-form">
          <Form>
            <FormGroup widths="equal">
              <FormInput
                required
                fluid
                label="Nome Completo"
                placeholder="nome completo"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
              />
              <FormInput
                required
                fluid
                label="Email"
                placeholder="teste@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                required
                fluid
                label="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </FormGroup>
            <FormGroup widths="equal">
              <FormInput
                minLength={5}
                maxLength={10}
                required
                fluid
                label="Senha"
                placeholder="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <FormInput
                minLength={5}
                maxLength={10}
                required
                fluid
                label="confirmarSenha"
                placeholder="confirmar senha"
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </FormGroup>
            <FormGroup widths="equal">
              <FormInput required fluid label="Telefone">
                <InputMask
                  mask="(99) 99999-9999"
                  value={numeroTelefone}
                  onChange={(e) => setNumeroTelefone(e.target.value)}
                />
              </FormInput>
              <FormInput required fluid label="CPF">
                <InputMask
                  mask="999.999.999-99"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormInput>
            </FormGroup>
          </Form>
        </div>

        <Button
          color="orange"
          circular
          size="large"
          onClick={() => salvar()}
          disabled={loading}
        >
          {loading ? (
            <Loader active inline inverted size="tiny" />
          ) : (
            <span style={{ color: "black" }}>Cadastro</span>
          )}
        </Button>

        <Button
          size="large"
          circular
          style={{ marginBottom: "10%", color: "black" }}
        >
          <Link to={"/login"} style={{ color: "black" }}>
            Entrar
          </Link>
        </Button>
      </Container>
    </div>
  );
}
