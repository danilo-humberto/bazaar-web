import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditProduct.css";
import { Button, Form, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";

const EditProduct = ({ produto, onCloseModal }) => {
  const [token, setToken] = useState(null);
  const [listaCategoria, setListaCategoria] = useState([])
  const [idCategoria, setIdCategoria] = useState();
  const [productData, setProductData] = useState({
    titulo: "",
    codigo: "",
    descricao: "",
    valorUnitario: "",
    idCategoria: ""
  });

  const [image, setImage] = useState(null);

  useEffect(() => {

    const getToken = () => {
      const tokenStored = localStorage.getItem("token");
      setToken(tokenStored);
    }

    getToken();

    if (produto) {
      setProductData(produto);
      console.log(produto)
    }
  }, [produto]);

  useEffect(() => {
    const buscarCategorias = async () => {
      if (!token) {
        console.log("Token não disponível ainda");
        return;
      }
  
      try {
        const response = await axios.get("http://localhost:8080/api/categoriaproduto", {
          headers: { Authorization: `Bearer ${token}` },
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
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    
    console.log(productData)

    const formData = new FormData();
    formData.append("produto", JSON.stringify(productData));
    if (image) {
      formData.append("imagem", image);
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/produto/${produto.id}`,
        formData, { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`}});

      if (response.status === 200) {
        toast.success("Editado com sucesso!", {
          position: "top-right",
          autoClose: 2000,
        });
        onCloseModal();
      } else
        toast.error("Erro ao editar!", {
          position: "top-right",
          autoClose: 2000,
        });
    } catch (error) {
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
            />

            <Form.Input
              fluid
              required
              label="Código"
              name="codigo"
              width={8}
              value={productData.codigo}
              onChange={handleInputChange}
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
              value={idCategoria}
              onChange={({value}) => {
                setIdCategoria(value)
              }}
            />

            <Form.Input
              fluid
              required
              label="Descrição"
              name="descricao"
              width={16}
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
            />
            <Form.Input
              type="file"
              fluid
              required
              label="Imagem do Produto"
              width={11}
              onChange={handleFileChange}
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
