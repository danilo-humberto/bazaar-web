import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  GridColumn,
  ButtonGroup,
  List,
} from "semantic-ui-react";
import Header from "../../components/header/header";
import Footer from "../../components/otherFooter/otherFooter";
import axios from "axios";
import ImageTeste from "../../assets/imageteste.jpeg"

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
      const response = await axios.get(
        `http://localhost:8080/api/usuario/${userId}`
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
                      <div>
                        {userData && userData.imageUrl ? (
                          <img src={ImageTeste} alt="foto de perfil" className="img-profile"/>
                        ) : (
                          <div className="profile-without-photo">
                            <span>Sem Foto</span>
                          </div>
                        )}
                      </div>
                      <List>
                        <List.Item>
                          <List.Header className>Nome: <span style={{color: 'black'}}>{userData.nomeCompleto}</span></List.Header>
                        </List.Item>
                        <List.Item>
                          <List.Header>Número: <span style={{color: 'black'}}>{userData.numeroTelefone}</span></List.Header>                          
                        </List.Item>
                        <List.Item>
                          <List.Header>Email: <span style={{color: 'black'}}>{userData.email}</span></List.Header>
                        </List.Item>
                      </List>
                    </>
                  )}
                </GridColumn>

                <GridColumn center>
                  <ButtonGroup vertical>
                    <Button color="orange" size="big" style={{borderRadius: "5px"}}>
                      Editar Perfil
                    </Button>
                    <br />
                    <Button color="orange" size="big" style={{borderRadius: "5px"}}>
                      <Link to={"/listProduct"} style={{color: 'white'}}>Produtos</Link>
                    </Button>
                    <br />
                    <Button color="orange" size="big" style={{borderRadius: "5px"}}>
                      <Link to={"/address"} style={{color: "white"}}>Adicionar Endereço</Link>
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
