import React from "react";
import {
  Button,
  Container,
  Divider,
  Image,
  Input,
  Table,
} from "semantic-ui-react";
import imageTest from "../../assets/imageteste.jpeg";
import HeaderComponent from '../../components/header/header'
import OtherFooter from '../../components/otherFooter/otherFooter'
import { useNavigate } from "react-router-dom";

const ListVendas = () => {

    const navigate = useNavigate();

    const atualizarListaCompras = () => {
        navigate(0);
    }

  return (
    <div>
      <HeaderComponent />
      <div style={{ marginTop: "8%", height: "74.6vh" }}>
        <Container
          textAlign="justified"
          style={{ height: "100%", overflow: "auto" }}
        >
          <div>
            <h1>Suas Vendas</h1>
          </div>

          <Divider />

          <div style={{ marginTop: "5%", marginBottom: "2%" }}>
            <div style={{ marginBottom: "20px" }}>
              <Input placeholder="Título" />
              <Input placeholder="Código" style={{ marginLeft: "10px" }} />
              <Input
                placeholder="Valor Unitário"
                style={{ marginLeft: "10px" }}
              />
              <Button color="blue" style={{ marginLeft: "10px" }}>
                Filtrar
              </Button>

              <Button
                color="green"
                onClick={atualizarListaCompras()}
                style={{ marginLeft: "362px" }}
              >
                Atualizar
              </Button>
            </div>

            <div style={{ flex: 1 }}>
              <Table color="orange" sortable celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Imagem</Table.HeaderCell>
                    <Table.HeaderCell>Código</Table.HeaderCell>
                    <Table.HeaderCell>Título</Table.HeaderCell>
                    <Table.HeaderCell>Descrição</Table.HeaderCell>
                    <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={4}>
                      <Image src={imageTest} size="small" rounded centered/>
                    </Table.Cell>
                    <Table.Cell>11111</Table.Cell>
                    <Table.Cell>titulo teste</Table.Cell>
                    <Table.Cell>descricao teste</Table.Cell>
                    <Table.Cell>R$ 30,00</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </Container>
      </div>
      <OtherFooter />
    </div>
  );
};

export default ListVendas;
