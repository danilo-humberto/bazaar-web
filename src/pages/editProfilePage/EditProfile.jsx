import React, { useState, useEffect } from "react";
import { Button, Grid, GridColumn, Form, Input, Icon } from "semantic-ui-react";
import Header from "../../components/header/header";
import Footer from "../../components/otherFooter/otherFooter";
import axios from "axios";
import "../profilePage/ProfilePage.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProfile() {

  const navigate = useNavigate();

  const getUserId = () => {
    const userId = localStorage.getItem("userId");
    return userId;
  };

  const [userData, setUserData] = useState({
    nomeCompleto: "",
    numeroTelefone: "",
    novaSenha: "",
    confirmaSenha: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getUserId();

      if (!userId) {
        console.error("ID do usuário não encontrado");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/api/usuario/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          setUserData(response.data);
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

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    const userId = getUserId();

    const { id, cpf, email, enderecos, produtos, login, situacao, senha, ...dataToSend } = userData;
    console.log(dataToSend);

    const formData = new FormData();
    formData.append("usuario", JSON.stringify(dataToSend));
    if (image) {
      formData.append("imagem", image);
    }

    try {
      if (userData.novaSenha !== userData.confirmaSenha) {
        toast.warning("As senhas não coincidem !", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        const response = await axios.put(
          `http://localhost:8080/api/usuario/${userId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          toast.success("Editado com sucesso!", { position: 'top-right', autoClose: 2000 });
          navigate('/profile')
        } else {
          console.error("Erro ao atualizar perfil", response.status, response.statusText);
          toast.error("Erro ao editar!", { position: 'top-right', autoClose: 2000 });
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
        <div className="background-profile">
          <div className="content-profile">
            <Grid columns={1}>
              <GridColumn width={6}>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Field>
                    <label>Foto de Perfil</label>
                    <Input type="file" onChange={handleFileChange} />
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
                    onClick={() => handleFormSubmit()}
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
