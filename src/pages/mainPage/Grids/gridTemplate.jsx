import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import "./gridTemplate.css";
import CardComponente from "../cards";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../../context/AuthContext'

export default function GridTemplate({descricao}) {
  const [listProduto, setListProduto] = useState([]);
  const {authState} = useContext(AuthContext);

  useEffect(() => {
    const mostrarProdutos = async () => {

      if(!authState.token) {
        console.error("Token não encontrado");
      }

      try{
        const response =  await axios.get(`http://localhost:8080/api/produto/mais-baratos/${descricao}`, {headers: {Authorization: `Bearer ${authState.token}`}});

        if(response.status === 200) {
          setListProduto(response.data)
        } else {
          console.error("Erro ao trazer os dados")
        }
      } catch(error) {
        console.error("Erro ao fazer a requisição")
      }
    }
    mostrarProdutos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.token]);


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
