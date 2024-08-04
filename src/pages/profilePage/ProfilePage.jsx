import React from "react";
import { Button, Grid, Image, GridColumn, ButtonGroup } from "semantic-ui-react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "react-toastify/dist/ReactToastify.css";

import "./ProfilePage.css";

/* 
O primeiro GridColumn ainda precisar ser integrado com o banco, então o código nem é esse, tem que fazer ele buscando direto no banco.
*/

export default function ProfilePage() {

  return (
    <div>
      <Header />
      <div className="container-profile">
        <div className="background-profile">
          <div className="content-profile">
            <div className="grid-content-profile">
              <Grid columns={2}>
                <GridColumn width={4}>
                  <Image
                    src='https://react.semantic-ui.com/images/wireframe/square-image.png'
                    size='medium'
                  />
                  <p className='name'>
                    FULANO DE SOUZA
                  </p>
                  <p className='infos'>
                    Cep: 55555-55<br/>
                    (81) 9 9999-9999<br/>
                    fulano@gmail.com
                  </p>
                </GridColumn>

                <GridColumn center>
                  <ButtonGroup vertical >
                  <Button
                    color="orange"
                    circular
                    size="big">Editar Perfil</Button><br/><br/>
                  <Button
                    color="orange"
                    circular
                    size="big">Produtos</Button><br/><br/>
                  <Button
                    color="orange"
                    circular
                    size="big">Adicionar Endereço</Button><br/><br/>
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
