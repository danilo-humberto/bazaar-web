/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
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
  Input,
} from "semantic-ui-react";
import HeaderComponent from "../../components/header/header";
import OtherFooter from "../../components/otherFooter/otherFooter";

export default function ListProductPage() {
  const [lista, setLista] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [titulo, setTitulo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [imagem, setImagem] = useState("");
  const [descricao, setDescricao] = useState("");

  const getUserId = () => {
    return localStorage.getItem("userId");
  };

  const carregarLista = useCallback(() => {
    const userId = getUserId();
    axios
      .get(`http://localhost:8080/api/usuario/${userId}`)
      .then((response) => {
        console.log("Resposta da API:", response.data);
        setLista(response.data.produtos || []);
        setFilteredList(response.data.produtos || []); // Inicializa a lista filtrada
      })
      .catch((error) => {
        console.error("Erro ao carregar a lista", error);
        setLista([]);
        setFilteredList([]);
      });
  }, []);

  useEffect(() => {
    carregarLista();
  }, [carregarLista]);

  const handleFilter = () => {
    const filtered = lista.filter(
      (produto) =>
        (titulo ? produto.titulo.includes(titulo) : true) &&
        (codigo ? produto.codigo.includes(codigo) : true) &&
        (valorUnitario
          ? produto.valorUnitario.toString().includes(valorUnitario)
          : true) &&
        (descricao ? produto.descricao.includes(descricao) : true)
    );
    setFilteredList(filtered);
  };

  const remover = async () => {
    await axios
      .delete(
        `http://localhost:8080/api/usuario/${getUserId()}/produto/${idRemover}`
      )
      .then((response) => {
        console.log("Produto removido com sucesso.");
        carregarLista(); // Recarregar a lista de produtos após remoção
      })
      .catch((error) => {
        console.log("Erro ao remover o produto.", error);
      });
    setOpenModal(false);
  };

  return (
    <div>
      <HeaderComponent />
      <div style={{ marginTop: "8%", height: "100%" }}>
        <Container textAlign="justified">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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

          <div style={{ marginTop: "5%", marginBottom: "3%" }}>
            <div style={{ marginBottom: "20px" }}>
              <Input
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <Input
                placeholder="Código"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                style={{ marginLeft: "10px" }}
              />
              <Input
                placeholder="Valor Unitário"
                value={valorUnitario}
                onChange={(e) => setValorUnitario(e.target.value)}
                style={{ marginLeft: "10px" }}
              />
              <Button
                color="blue"
                onClick={handleFilter}
                style={{ marginLeft: "10px" }}
              >
                Filtrar
              </Button>
            </div>

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Imagem</Table.HeaderCell>
                  <Table.HeaderCell>Código</Table.HeaderCell>
                  <Table.HeaderCell>Título</Table.HeaderCell>
                  <Table.HeaderCell>Descrição</Table.HeaderCell>
                  <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {filteredList.length > 0 ? (
                  filteredList.map((produto) => (
                    <Table.Row key={produto.id}>
                      <Table.Cell>
                        <Image
                          src={produto.imagemUrl || "default-image.jpg"}
                          size="small"
                        />
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
                          title="Clique aqui para editar os dados deste produto"
                          icon
                        >
                          <Link
                            to="/form-produto"
                            state={{ id: produto.id }}
                            style={{ color: "green" }}
                          >
                            <Icon name="edit" />
                          </Link>
                        </Button>{" "}
                        &nbsp;
                        <Button
                          inverted
                          circular
                          color="red"
                          title="Clique aqui para remover este produto"
                          icon
                          onClick={() => {
                            setIdRemover(produto.id);
                            setOpenModal(true);
                          }}
                        >
                          <Icon name="trash" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan="6" textAlign="center">
                      Nenhum produto encontrado.
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        </Container>
      <OtherFooter />
      </div>
      <Modal
        basic
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
      >
        <Header icon>
          <Icon name="trash" />
          <div style={{ marginTop: "5%" }}>
            Tem certeza que deseja remover esse registro?
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
          <Button color="green" inverted onClick={() => remover()}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
