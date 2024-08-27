import React, { useState, useEffect, useContext } from "react";
import { Button, Grid, GridColumn, ButtonGroup, List, Loader } from "semantic-ui-react";
import Header from "../../components/header/header";
import Footer from "../../components/otherFooter/otherFooter";
import axios from "axios";

import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { notifyError } from "../../views/util/Util";

export default function ProfilePage() {
  
  const {authState} = useContext(AuthContext);

  const UserData = async (setUserData) => {

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
        const userData = response.data;

        setUserData(userData);
      } else {
        notifyError(
          "Erro ao buscar dados do usuário",
          response.status,
          response.statusText
        );
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
                        Meus Endereços
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
