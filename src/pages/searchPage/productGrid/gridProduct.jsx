import axios from "axios";
import React, { useEffect, useState } from "react";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import CardComponente from "../cardsProduct";
import "./gridProduct.css";

export default function GridProduct({ searchTerm }) {
  const [listProduto, setListProduto] = useState([]);

  useEffect(() => {
    if (searchTerm) {

      const url = `http://localhost:8080/api/produto/search/${encodeURIComponent(searchTerm)}`;
      
      axios.get(url)
        .then((response) => {
          setListProduto(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar produtos:", error);
        });
    } else {
      setListProduto([]);
    }
  }, [searchTerm]);

  return (
    <div className="background-grid-product">
      <Grid columns={5}>
        <GridRow>
          {listProduto.map((produto) => {
            return (
              <GridColumn key={produto.id}>
                <CardComponente
                  imageUrl={produto.imagem}
                  titulo={produto.titulo}
                  valorUnitario={produto.valorUnitario}
                  descricao={produto.descricao}
                />
                <br />
              </GridColumn>
            );
          })}
        </GridRow>
      </Grid>
    </div>
  );
}
