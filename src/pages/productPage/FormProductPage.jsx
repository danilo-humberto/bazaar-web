import React, { useState } from "react";
import { Form, Icon, Button, Container, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/otherFooter/otherFooter";
import axios from "axios";
import "./FormProductPage.css"; 

export default function FormCliente() {
  const [idProduto, setIdProduto] = useState();
  const [codigo, setCodigo] = useState();
  const [titulo, setTitulo] = useState();
  const [valorUnitario, setValorUnitario] = useState();
  const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
  const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
  const [idCategoria, setIdCategoria] = useState();
  const [imagem, setImagem] = useState(null);

  const handleFileChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const salvar = () => {
    let produtoRequest = {
      idCategoria: idCategoria,
      codigo: codigo,
      titulo: titulo,
      valorUnitario: valorUnitario,
      tempoEntregaMinimo: tempoEntregaMinimo,
      tempoEntregaMaximo: tempoEntregaMaximo,
    };

    let formData = new FormData();
    formData.append("produto", JSON.stringify(produtoRequest));
    if (imagem) {
      formData.append("imagem", imagem);
    }

    if (idProduto != null) {
      // Alteração:
      axios
        .put("http://localhost:8080/api/produto" + idProduto, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Produto alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alterar um produto.");
        });
    } else {
      // Cadastro:
      axios
        .post("http://localhost:8080/api/produto", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Produto cadastrado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o produto.");
        });
    }
  };

  return (
    <div>
      <Header />
      <div>
        <Container
          textAlign="justified"
          style={{ height: "610px", marginTop: "25vh" }}
        >
          {idProduto === undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}

          {idProduto !== undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Título"
                  maxLength="100"
                  placeholder="Informe o título do produto"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="Código do Produto"
                  placeholder="Informe o código do produto"
                  width={"8"}
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Select
                width={8}
                  required
                  fluid
                  tabIndex="3"
                  placeholder="Selecione"
                  label="Categoria"
                  value={idCategoria}
                  onChange={(e, { value }) => {
                    setIdCategoria(value);
                  }}
                />

                <Form.Input
                width={8}
                  required
                  fluid
                  label="Valor Unitário"
                  value={valorUnitario}
                  onChange={(e) => setValorUnitario(e.target.value)}
                ></Form.Input>
              </Form.Group>

              {/* Campo de Upload de Imagem */}
              <div className="upload-container">
                <label>Imagem do Produto</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </div>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/listProduct"}>
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" />
                  <Link to={"/listProduct"}>Listar</Link>
                </Button>
              </Link>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
