import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import "./gridTemplate.css";
import CardComponente from "../cards";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GridTemplate({descricao}) {
  const [listProduto, setListProduto] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    mostrarProdutos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mostrarProdutos = async () => {
    await axios.get(`http://localhost:8080/api/produto/mais-baratos/${descricao}`, {headers: {Authorization: `Bearer ${token}`}})
    .then((response) => {
      setListProduto(response.data);
    })
    .catch((error) => {
      if(error.reponse && error.response.status === 401){
        navigate('/login')
        toast.warning("Tempo de login foi expirado, faça login novamente!", {position: 'top-right', autoClose: 2000})
      } else console.log("Erro: " + error);
    })
    ;
  }

  return (
    <div className="background-grid">
      <Grid columns={5}>
        <GridRow>
          {listProduto.map((produto) => {
            return (
              <GridColumn key={produto.id}>
                <CardComponente
                  imageUrl={produto.imagemUrl}
                  descricao={produto.descricao}
                  titulo={produto.titulo}
                  valorUnitario={produto.valorUnitario}
                  id={produto.id}
                />
              </GridColumn>
            );
          })}
        </GridRow>
      </Grid>
    </div>
  );
}
