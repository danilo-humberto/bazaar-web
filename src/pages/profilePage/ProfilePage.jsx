import React, { useState, useEffect } from "react";
import { Button, Grid, GridColumn, ButtonGroup, List, Loader } from "semantic-ui-react";
import Header from "../../components/header/header";
import Footer from "../../components/otherFooter/otherFooter";
import axios from "axios";

import "./ProfilePage.css";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const getUserId = () => {
    const userId = localStorage.getItem("userId");
    console.log("userId obtido:", userId);
    return userId;
  };

  const UserData = async (setUserData) => {
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
        const userData = response.data;
        console.log(userData);

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

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    UserData(setUserData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  {userData ? (
                    <>
                      <div>
                        {userData && userData.imagemUrl ? (
                          <img
                            src={userData.imagemUrl}
                            alt="foto de perfil"
                            className="img-profile"
                            loading="lazy"
                          />
                        ) : (
                          <div className="profile-without-photo">
                            <span>Sem Foto</span>
                          </div>
                        )}
                      </div>
                      <List>
                        <List.Item>
                          <List.Header className>
                            Nome:{" "}
                            <span style={{ color: "black" }}>
                              {userData.nomeCompleto}
                            </span>
                          </List.Header>
                        </List.Item>
                        <List.Item>
                          <List.Header>
                            Número:{" "}
                            <span style={{ color: "black" }}>
                              {userData.numeroTelefone}
                            </span>
                          </List.Header>
                        </List.Item>
                        <List.Item>
                          <List.Header>
                            Email:{" "}
                            <span style={{ color: "black" }}>
                              {userData.email}
                            </span>
                          </List.Header>
                        </List.Item>
                      </List>
                    </>
                  ) : (
                    <div style={{marginLeft: '70px', marginTop: '50px'}}>
                      <Loader active inline size="big"/>
                    </div>
                  )}
                </GridColumn>

                <GridColumn center>
                  <ButtonGroup vertical>
                    <Link to={"/editProfile"} style={{ color: "white" }}>
                      <Button
                        color="orange"
                        size="big"
                        style={{ borderRadius: "5px" }}
                      >
                        Editar Perfil
                      </Button>
                    </Link>
                    <br />
                    <Button
                      color="orange"
                      size="big"
                      style={{ borderRadius: "5px" }}
                    >
                      <Link to={"/listProduct"} style={{ color: "white" }}>
                        Produtos
                      </Link>
                    </Button>
                    <br />
                    <Button
                      color="orange"
                      size="big"
                      style={{ borderRadius: "5px" }}
                    >
                      <Link to={"/address"} style={{ color: "white" }}>
                        Adicionar Endereço
                      </Link>
                    </Button>
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
