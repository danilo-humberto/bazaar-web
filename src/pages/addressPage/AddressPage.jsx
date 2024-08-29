import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Modal, Table } from "semantic-ui-react";
import Footer from "../../components/footer/footer";
import HeaderComponent from "../../components/header/header";
import { AuthContext } from "../../context/AuthContext";
import { useAxios } from "../../hooks/useAxios";
import RegisterAddress from "./RegisterAddress";

export default function AddressPage() {

  const [openModal, setOpenModal] = useState(false);
  const { authState } = useContext(AuthContext);
  const [endereco, setEndereco] = useState([]);

  const { data } = useAxios(`http://localhost:8080/api/usuario/${authState.userId}`)

  useEffect(() => {
    setEndereco(data.enderecos)
    console.log(endereco)
  }, [data])

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
                {endereco ? endereco.map((address) => (
                  <Table.Row key={address.id}>
                  <Table.Cell>{address.estado}</Table.Cell>
                  <Table.Cell>{address.cidade}</Table.Cell>
                  <Table.Cell>{address.bairro}</Table.Cell>
                  <Table.Cell>{address.rua}</Table.Cell>
                  <Table.Cell>{address.cep}</Table.Cell>
                  <Table.Cell>{address.numero}</Table.Cell>
                  <Table.Cell>{address.complemento}</Table.Cell>
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
                )) : (
                  <Table.Row>
                    <Table.Cell colSpan="8" textAlign="center">
                      Nenhum endereço encontrado.
                    </Table.Cell>
                  </Table.Row>
                )}
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
