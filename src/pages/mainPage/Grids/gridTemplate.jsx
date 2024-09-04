import { Grid, GridColumn, GridRow, Loader } from "semantic-ui-react";
import "./gridTemplate.css";
import CardComponente from "../cards";
import React, { useEffect, useState } from "react";
import { useAxios } from "../../../hooks/useAxios";

export default function GridTemplate({ descricao }) {
  const [produtos, setProdutos] = useState(null);
  const { data } = useAxios(
    `http://localhost:8080/api/produto/mais-baratos/${descricao}`
  );

  useEffect(() => {
    if(data) {
      setProdutos(data);
    }
  }, [data])

  return (
    <div className="background-grid">
      <Grid columns={5}>
        <GridRow>
          {produtos ? (
            <>
              {produtos.map((produto) => {
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
            </>
          ) : (
            <div><Loader active size="big" inline/></div>
          )}
        </GridRow>
      </Grid>
    </div>
  );
}
