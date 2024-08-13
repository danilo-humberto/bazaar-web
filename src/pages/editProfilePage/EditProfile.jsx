import React, { useState, useEffect } from "react";
import { Button, Grid, GridColumn, Form, Input, Icon } from "semantic-ui-react";
import Header from "../../components/header/header";
import Footer from "../../components/otherFooter/otherFooter";
import axios from "axios";
import "../profilePage/ProfilePage";

export default function EditProfile() {
  const getUserId = () => {
    const userId = localStorage.getItem("userId");
    return userId;
  };

  const [userData, setUserData] = useState({
    nomeCompleto: "",
    numeroTelefone: "",
    cpf: "",
    imageUrl: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

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
    setSelectedFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userId = getUserId();

    const formData = new FormData();
    formData.append("nomeCompleto", userData.nomeCompleto);
    formData.append("cpf", userData.cpf);
    formData.append("numeroTelefone", userData.numeroTelefone);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/usuario/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        alert("Perfil atualizado com sucesso!");
      } else {
        console.error(
          "Erro ao atualizar perfil",
          response.status,
          response.statusText
        );
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
                <Form>
                  <Form.Field>
                    <label>Foto de Perfil</label>
                    <Input type="file" onChange={handleFileChange} />
                  </Form.Field>
                  <Form.Field>
                    <br />
                    <label>Nome Completo</label>
                    <Input
                      name="nomeCompleto"
                      placeholder="Nome Completo"
                      value={userData.nomeCompleto}
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <br />
                    <label>CPF</label>
                    <Input
                      name="cpf"
                      placeholder="999.999.999-99"
                      value={userData.cpf}
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <br />
                    <label>Número de Telefone</label>
                    <Input
                      name="numeroTelefone"
                      placeholder="(99) 99999.9999"
                      value={userData.numeroTelefone}
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                  <br />
                  <br />
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
                    Voltar
                  </Button>

                  <Button
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
