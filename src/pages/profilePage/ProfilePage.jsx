import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Grid, GridColumn, List, Loader } from "semantic-ui-react";
import Footer from "../../components/otherFooter/otherFooter";
import OtherHeader from "../../components/otherHeader/otherHeader";
import { AuthContext } from "../../context/AuthContext";
import { useAxios } from "../../hooks/useAxios";
import "./ProfilePage.css";

export default function ProfilePage() {
  
  const {authState} = useContext(AuthContext);

  const { data } = useAxios(`http://localhost:8080/api/usuario/${authState.userId}`);

  console.log(data)

  return (
    <div>
      <OtherHeader />
      <div className="container-profile">
        <div className="background-profile">
          <div className="content-profile">
            <div className="grid-content-profile">
              <Grid columns={2}>
                <GridColumn width={4}>
                  {data ? (
                    <>
                      <div>
                        {data && data.imagem ? (
                          <img
                            src={`http://localhost:8080/static/uploaded-imgs/${data.imagem}`}
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
                              {data.nomeCompleto}
                            </span>
                          </List.Header>
                        </List.Item>
                        <List.Item>
                          <List.Header>
                            Número:{" "}
                            <span style={{ color: "black" }}>
                              {data.numeroTelefone}
                            </span>
                          </List.Header>
                        </List.Item>
                        <List.Item>
                          <List.Header>
                            Email:{" "}
                            <span style={{ color: "black" }}>
                              {data.email}
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
