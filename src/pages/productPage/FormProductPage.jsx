import React, { useState, useEffect } from "react";
import { Form, Icon, Button, Container, Input, FormTextArea } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/otherFooter/otherFooter";
import axios from "axios";
import "./FormProductPage.css"; 

export default function FormCliente() {
  // eslint-disable-next-line no-unused-vars
  const [idProduto, setIdProduto] = useState();
  const [codigo, setCodigo] = useState();
  const [titulo, setTitulo] = useState();
  const [valorUnitario, setValorUnitario] = useState();
  const [idCategoria, setIdCategoria] = useState();
  const [imagem, setImagem] = useState(null);
  const [listaCategoria, setListaCategoria] = useState([])
  const [descricao, setDescricao] = useState([])
  

  const handleFileChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const getUserId = () => {
    const userId = localStorage.getItem("userId");
    return userId;
  };

  const limpar =() =>{

    setCodigo('')
          
    setTitulo('')

    setValorUnitario('')

    setImagem('')
  
    setDescricao('')
    
  }
  const salvar = () => {

    const userId = getUserId();
    
    let produtoRequest = {
      idCategoria: idCategoria,
      codigo: codigo,
      titulo: titulo,
      valorUnitario: valorUnitario,
      descricao:descricao
    };

    let formData = new FormData();
    formData.append("produto", JSON.stringify(produtoRequest));
    if (imagem) {
      formData.append("imagem", imagem);
    }

    if (idProduto != null) {
      // Alteração:
      axios
        .put(`http://localhost:8080/api/produto/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Produto alterado com sucesso.");
          limpar();
        })
        .catch((error) => {
          console.log("Erro ao alterar um produto." + userId);
        });
    } else {
      // Cadastro:
      axios
      .post(`http://localhost:8080/api/produto/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Produto cadastrado com sucesso.");
          limpar();
        })
        .catch((error) => {
          console.log("Erro ao incluir o produto.");
        });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/categoriaproduto")
       .then((response) => {
           const dropDownCategorias = response.data.map(c => ({ text: c.descricao, value: c.id }));
           setListaCategoria(dropDownCategorias);
       })

  }, [])


  return (
    <div>
      <Header />
      <div>
        <Container
          textAlign="justified"
          style={{ height: "70vh", marginTop: "20vh" }}
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
                required
                fluid
                tabIndex='3'
                placeholder='Selecione'
                label='Categoria'
                options={listaCategoria}
                value={idCategoria}
                onChange={(e, { value }) => {
                  setIdCategoria(value)
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

              <Form.Group>
                <FormTextArea
                  required
                  label='Descrição'
                  placeholder='Informe a descrição do produto'
                  width={16}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
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

