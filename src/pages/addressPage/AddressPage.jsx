import { Button, Container, Divider, Icon, Modal, Table } from "semantic-ui-react";
import React, {useState} from "react";
import HeaderComponent from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Link } from "react-router-dom";
import RegisterAddress from "./RegisterAddress";

export default function AddressPage() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <HeaderComponent />
      <div
        style={{ height: "100vh", width: "80vw", margin: "20vh auto 0 auto" }}
      >
        <Container
          textAlign="justified"
          className="container-address-page"
          fluid
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1>Endereços</h1>
            <Button
                label="Novo"
                circular
                color="orange"
                icon="clipboard outline"
                floated="right"
                as={Link}
                onClick={() => setOpenModal(true)}
              />
          </div>
          <Divider />

          <div>
            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Estado</Table.HeaderCell>
                  <Table.HeaderCell>Cidade</Table.HeaderCell>
                  <Table.HeaderCell>Bairro</Table.HeaderCell>
                  <Table.HeaderCell>Rua</Table.HeaderCell>
                  <Table.HeaderCell>CEP</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Numero</Table.HeaderCell>
                  <Table.HeaderCell>Complemento</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>Pernambuco</Table.Cell>
                  <Table.Cell>Jaboatão Dos Guararapes</Table.Cell>
                  <Table.Cell>Vila Rica</Table.Cell>
                  <Table.Cell>Avenida 4</Table.Cell>
                  <Table.Cell>54090470</Table.Cell>
                  <Table.Cell>302</Table.Cell>
                  <Table.Cell>Em frente ao mercado</Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button
                        inverted
                        circular
                        color="green"
                        title="Editar"
                        icon
                    >
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        inverted
                        circular
                        color="red"
                        title="Remover"
                        icon
                    >
                        <Icon name="trash"/>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
      <Footer />
      <Modal
        basic
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
      >
        <RegisterAddress onCloseModal = {() => setOpenModal(false)}/>
      </Modal>
    </div>
  );
}
