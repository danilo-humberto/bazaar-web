import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, FormTextArea, Icon, Input } from "semantic-ui-react";
import Header from "../../components/header/header";
import Footer from "../../components/otherFooter/otherFooter";
import "./FormProductPage.css";
import { AuthContext } from '../../context/AuthContext'

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

  const { authState } = useContext(AuthContext);
  

  const handleFileChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const limpar =() =>{

    setCodigo('')
          
    setTitulo('')

    setValorUnitario('')

    setImagem('')
  
    setDescricao('')
    
  }
  const salvar = async () => {
    
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

      await axios
      .post(`http://localhost:8080/api/produto/${authState.userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authState.token}`
          },
        })
        .then((response) => {
          console.log("Produto cadastrado com sucesso.");
          limpar();
        })
        .catch((error) => {
          console.log("Erro ao incluir o produto.");
        });
  };

  useEffect(() => {
    const buscarCategorias = async () => {
      if (!authState.token) {
        console.log("Token não disponível ainda");
        return;
      }
  
      try {
        const response = await axios.get("http://localhost:8080/api/categoriaproduto", {
          headers: { Authorization: `Bearer ${authState.token}` },
        });
  
        if (response.status === 200) {
          const dropDownCategorias = response.data.map((c) => ({
            text: c.descricao,
            value: c.id,
          }));
          setListaCategoria(dropDownCategorias);
        } else {
          console.log("Erro ao trazer as categorias, status: ", response.status);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
  
    buscarCategorias();
  }, [authState.token]);

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
                width={6}
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
                width={10}
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

