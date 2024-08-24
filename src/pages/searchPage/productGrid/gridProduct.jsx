import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import "./gridProduct.css";
import CardComponente from "../cardsProduct";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="background-grid">
      <Grid columns={5}>
        <GridRow>
          {listProduto.map((produto) => {
            return (
              <GridColumn key={produto.id}>
                <CardComponente
                  imageUrl={produto.imagemUrl}
                  titulo={produto.titulo}
                  valorUnitario={produto.valorUnitario}
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
