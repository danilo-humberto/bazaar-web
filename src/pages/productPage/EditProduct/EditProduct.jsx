import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./EditProduct.css";
import { Button, Form, Icon } from "semantic-ui-react";
import { notifyError, notifySuccess } from "../../../views/util/Util";
import { AuthContext } from "../../../context/AuthContext";

const EditProduct = ({ produto, onCloseModal }) => {
  const { authState } = useContext(AuthContext);
  const [listaCategoria, setListaCategoria] = useState([])
  const [productData, setProductData] = useState({
    titulo: "",
    codigo: "",
    descricao: "",
    valorUnitario: "",
    idCategoria: ""
  });

  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    if (produto) {
      setProductData(produto);
      console.log(produto)
    }
  }, [produto]);

  useEffect(() => {
    const buscarCategorias = async () => {
  
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleCategoryChange = (e, { value }) => {
    setProductData(prevState => ({
      ...prevState,
      idCategoria: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("produto", JSON.stringify({
      titulo: productData.titulo,
      codigo: productData.codigo,
      descricao: productData.descricao,
      valorUnitario: productData.valorUnitario,
      idCategoria: productData.idCategoria,
    }));
    if (imagem) {
      formData.append("imagem", imagem);
    } 
  

    try {
      const response = await axios.put(
        `http://localhost:8080/api/produto/${produto.id}`,
        formData, { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${authState.token}`}});

      if (response.status === 200) {
        notifySuccess("Editado com sucesso!");
        onCloseModal();
      } else
        notifyError("Erro ao editar!");
    } catch (error) {
      notifyError("Falha na requisição: ", error);
      console.error("Falha na requisição: ", error);
    }
  };

  return (
    <div className="container-edit-product">
      <h2>Editar Produto</h2>
      <div>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Input
              fluid
              required
              label="Título"
              name="titulo"
              width={8}
              value={productData.titulo}
              onChange={handleInputChange}
              style={{marginTop: '0px'}}
            />

            <Form.Input
              fluid
              required
              label="Código"
              name="codigo"
              width={8}
              value={productData.codigo}
              onChange={handleInputChange}
              style={{marginTop: '0px'}}
            />
          </Form.Group>

          <Form.Group>

            <Form.Select 
              required
              fluid
              width={6}
              tabIndex={3}
              placeholder="Selecione"
              label='Categoria'
              options={listaCategoria}
              value={productData.idCategoria}
              onChange={handleCategoryChange}
            />

            <Form.Input
              fluid
              required
              label="Descrição"
              name="descricao"
              width={16}
              style={{marginTop: '0px'}}
              value={productData.descricao}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              fluid
              required
              label="Valor Unitário do Produto"
              name="valorUnitario"
              width={5}
              placeholder="0,00"
              value={productData.valorUnitario}
              onChange={handleInputChange}
              style={{marginTop: '0px'}}
            />
            <Form.Input
              type="file"
              fluid
              required
              label="Imagem do Produto"
              width={11}
              onChange={handleFileChange}
              style={{marginTop: '0px', height: '38px'}}
            />
          </Form.Group>
        </Form>
      </div>

      <div className="btns-edit-product">
        <Button
          type="button"
          circular
          icon
          labelPosition="left"
          color="red"
          inverted
          onClick={onCloseModal}
        >
          <Icon name="reply" />
          Cancelar
        </Button>

        <Button
          type="button"
          circular
          icon
          labelPosition="right"
          color="green"
          inverted
          onClick={handleFormSubmit}
        >
          <Icon name="save" />
          Alterar
        </Button>
      </div>
    </div>
  );
};

export default EditProduct;
