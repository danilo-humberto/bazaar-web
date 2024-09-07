/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Button, Grid, GridColumn, Form, Input, Icon } from "semantic-ui-react";
import Header from "../../components/header/header";
import Footer from "../../components/otherFooter/otherFooter";
import axios from "axios";
import "../profilePage/ProfilePage.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { notifyError, notifyWarn } from "../../views/util/Util";

export default function EditProfile() {

  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    nomeCompleto: "",
    numeroTelefone: "",
    novaSenha: "",
    confirmaSenha: "",
  });

  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {

      if (!authState.userId) {
        notifyError("ID do usuário não encontrado");
        console.error("ID do usuário não encontrado");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/usuario/${authState.userId}`,
          { headers: { Authorization: `Bearer ${authState.token}` } }
        );
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          notifyError("Erro ao buscar dados do usuário",
            response.status,
            response.statusText);
          console.error(
            "Erro ao buscar dados do usuário",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        notifyError("Erro ao fazer a requisição:", error);
        console.error("Erro ao fazer a requisição:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImagem(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { id, cpf, email, enderecos, produtos, login, situacao, senha, pagamentos, ...dataToSend } = userData;
    console.log(dataToSend);

    let formData = new FormData();
    formData.append("usuario", JSON.stringify(dataToSend));
    if (imagem) {
      console.log(imagem)
      formData.append("imagem", imagem);
    }

    if(
      !userData.nomeCompleto ||
      !userData.novaSenha ||
      !userData.confirmaSenha ||
      !userData.numeroTelefone
    ) {
      notifyWarn("Todos os campos precisam ser preenchidos!", {
        position: 'top-right',
        autoClose: 2000
      })
      return
    }

    try {
      if (userData.novaSenha !== userData.confirmaSenha) {
        notifyWarn("As senhas não coincidem !", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        const response = await axios.put(
          `http://localhost:8080/api/usuario/${authState.userId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authState.token}`
             },
          }
        );

        if (response.status === 200) {
          navigate('/profile')
        } else {
          console.error("Erro ao atualizar perfil", response.status, response.statusText);
        }
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container-profile">
        <div className="background-profile" style={{height: '600px'}}>
          <div className="content-profile" style={{marginTop: '30px'}}>
            <Grid columns={1}>
              <GridColumn width={6}>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Field>
                    <label>Foto de Perfil</label>
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Nome Completo</label>
                    <Input
                      name="nomeCompleto"
                      placeholder="Nome Completo"
                      value={userData.nomeCompleto}
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Nova Senha</label>
                    <Input
                      type="password"
                      name="novaSenha"
                      value={userData.novaSenha}
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Confirmar Nova Senha</label>
                    <Input
                      type="password"
                      name="confirmaSenha"
                      value={userData.confirmaSenha}
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Número de Telefone</label>
                    <Input
                      name="numeroTelefone"
                      placeholder="(99) 99999.9999"
                      value={userData.numeroTelefone}
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                  <br />
                  <Button
                    type="button"
                    inverted
                    circular
                    icon
                    labelPosition="left"
                    color="orange"
                  >
                    <Icon name="reply" />
                    <Link to={"/profile"} style={{ color: "orange" }}>
                      Voltar
                    </Link>
                  </Button>

                  <Button
                    type="submit"
                    inverted
                    circular
                    icon
                    labelPosition="left"
                    color="green"
                    floated="right"
                  >
                    <Icon name="save" />
                    Salvar
                  </Button>
                </Form>
              </GridColumn>
            </Grid>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
