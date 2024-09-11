/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Image,
  Input,
  Table,
} from "semantic-ui-react";
import HeaderComponent from "../../components/header/header";
import OtherFooter from "../../components/otherFooter/otherFooter";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const ListCompras = () => {
  const [buyProducts, setBuyProducts] = useState();
  const { authState } = useContext(AuthContext);

  const getBuyProducts = async () => {
    let response = await axios.get(`http://localhost:8080/api/pedidos/compras/${authState.userId}`)
    if(response.status === 200 && response.data.length > 0) {
      console.log(response.data)
      setBuyProducts(response.data)
    } else {
      setBuyProducts(null)
    }
  }

  useEffect(() => {
    getBuyProducts();
  }, [])

  const atualizarListaCompras = () => {
    getBuyProducts();
  };

  return (
    <div>
      <HeaderComponent />
      <div style={{ marginTop: "8%", height: "74.6vh" }}>
        <Container
          textAlign="justified"
          style={{ height: "100%", overflow: "auto" }}
        >
          <div>
            <h1>Suas Compras</h1>
          </div>

          <Divider />

          <div style={{ marginTop: "5%", marginBottom: "2%" }}>
            <div style={{ marginBottom: "20px" }}>
              <Input placeholder="Título" />
              <Input
                placeholder="Código"
                style={{ marginLeft: "10px", width: "200px" }}
              />
              <Input
                placeholder="Valor Unitário"
                style={{ marginLeft: "10px", width: "200px" }}
              />
              <Button color="blue" style={{ marginLeft: "10px" }}>
                Filtrar
              </Button>

              <Button
                color="green"
                onClick={atualizarListaCompras}
                style={{ marginLeft: "145px" }}
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
                  {buyProducts ? (
                    buyProducts.map((compras) => (
                      compras.produtos.map((product) => (
                      <Table.Row>
                      <Table.Cell width={4}>
                        <Image src={`http://localhost:8080/static/uploaded-imgs/${product.imagem}`} size="small" rounded centered />
                      </Table.Cell>
                      <Table.Cell>{product.codigo}</Table.Cell>
                      <Table.Cell>{product.titulo}</Table.Cell>
                      <Table.Cell>{product.descricao}</Table.Cell>
                      <Table.Cell>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.valorUnitario)}</Table.Cell>
                    </Table.Row>
                      ))
                    ))  
                  ) : (
                    <Table.Row>
                      <Table.Cell textAlign="center" colSpan="5">Nenhuma Compra Efetuada!</Table.Cell>
                    </Table.Row>
                  )}
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

export default ListCompras;
