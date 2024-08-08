import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Icon,
  Table,
  Modal,
  Header,
  Image,
} from "semantic-ui-react";
import HeaderComponent from "../../components/header/header";
import OtherFooter from "../../components/otherFooter/otherFooter";

export default function ListProductPage() {
  const [lista] = useState([
    // Exemplos de produtos para ilustrar
    {
      id: 1,
      codigo: "001",
      titulo: "Produto 1",
      descricao: "Descrição do Produto 1",
      valorUnitario: "100,00",
      tempoEntregaMinimo: "2 dias",
      tempoEntregaMaximo: "5 dias",
      imagem: "url_da_imagem_1",
    },
    {
      id: 2,
      codigo: "002",
      titulo: "Produto 2",
      descricao: "Descrição do Produto 2",
      valorUnitario: "200,00",
      tempoEntregaMinimo: "3 dias",
      tempoEntregaMaximo: "6 dias",
      imagem: "url_da_imagem_2",
    },
  ]);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <HeaderComponent />
      <div style={{ marginTop: "10%", height: "69.7vh", overflow: 'hidden'}}>
        <Container textAlign="justified">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1> Produtos </h1>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/formProduct"
            />
          </div>

          <Divider />

          <div style={{ marginTop: "5%" }}>

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Imagem</Table.HeaderCell>
                  <Table.HeaderCell>Codigo</Table.HeaderCell>
                  <Table.HeaderCell>Título</Table.HeaderCell>
                  <Table.HeaderCell>Descrição</Table.HeaderCell>
                  <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((produto) => (
                  <Table.Row key={produto.id}>
                    <Table.Cell>
                      <Image src={produto.imagem} size="small" />
                    </Table.Cell>
                    <Table.Cell>{produto.codigo}</Table.Cell>
                    <Table.Cell>{produto.titulo}</Table.Cell>
                    <Table.Cell>{produto.descricao}</Table.Cell>
                    <Table.Cell>{produto.valorUnitario}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste cliente"
                        icon
                      >
                        <Link
                          to="/form-produto"
                          state={{ id: produto.id }}
                          style={{ color: "green" }}
                        >
                          {" "}
                          <Icon name="edit" />{" "}
                        </Link>
                      </Button>{" "}
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este cliente"
                        icon
                        onClick={() => setOpenModal(true)}
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
      <OtherFooter />
      <Modal
        basic
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
      >
        <Header icon>
          <Icon name="trash" />
          <div style={{ marginTop: "5%" }}>
            {" "}
            Tem certeza que deseja remover esse registro?{" "}
          </div>
        </Header>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => setOpenModal(false)}
          >
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" inverted>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
