import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import "./gridTemplate.css";
import CardComponente from "../cards";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GridTemplate({descricao}) {
  const [listProduto, setListProduto] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/produto/mais-baratos/${descricao}`)
      .then((response) => {
        setListProduto(response.data);
      });
  }, []);

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
                />
              </GridColumn>
            );
          })}
        </GridRow>
      </Grid>
    </div>
  );
}
