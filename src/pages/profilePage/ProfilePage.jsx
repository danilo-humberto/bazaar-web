import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Image,
  GridColumn,
  ButtonGroup,
  List
} from "semantic-ui-react";
import Header from "../../components/header/header";
import Footer from "../../components/otherFooter/otherFooter";

import "./ProfilePage.css";

const getUserId = () => {
  const userId = localStorage.getItem("userId");
  console.log("Obtained userId:", userId);
  return userId;
};

const fetchUserData = async (setUserData) => {
  const userId = getUserId();

  if (!userId) {
    console.error("ID do usuário não encontrado");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/usuario/${userId}`,
      {
        method: "GET",
      }
    );

    console.log("Response status:", response.status);
    if (response.ok) {
      const userData = await response.json();
      console.log("User data fetched successfully:", userData);
      setUserData(userData);
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

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const testUserId = "3";
    localStorage.setItem("userId", testUserId);

    fetchUserData(setUserData);
  }, []);

  return (
    <div>
      <Header />
      <div className="container-profile">
        <div className="background-profile">
          <div className="content-profile">
            <div className="grid-content-profile">
              <Grid columns={2}>
                <GridColumn width={4}>
                  {userData && (
                    <>
                      <Image src={userData.imagemUrl} size="small" />
                      <List>
                        <List.Item>
                          <List.Header className>Nome</List.Header>
                          {userData.nomeCompleto}
                        </List.Item>
                        <List.Item>
                          <List.Header>Número</List.Header>
                          {userData.numeroTelefone}
                        </List.Item>
                        <List.Item>
                          <List.Header>Email</List.Header>
                          {userData.email}
                        </List.Item>
                        <List.Item>
                          <List.Header>Endereço</List.Header>
                          {userData.endereco}
                        </List.Item>
                      </List>
                    </>
                  )}
                </GridColumn>

                <GridColumn center>
                  <ButtonGroup vertical>
                    <Button color="orange" circular size="big">
                      Editar Perfil
                    </Button>
                    <br />
                    <br />
                    <Button color="orange" circular size="big">
                      Produtos
                    </Button>
                    <br />
                    <br />
                    <Button color="orange" circular size="big">
                      Adicionar Endereço
                    </Button>
                    <br />
                    <br />
                  </ButtonGroup>
                </GridColumn>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
