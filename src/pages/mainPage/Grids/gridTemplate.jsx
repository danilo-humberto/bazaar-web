import { Grid, GridColumn, GridRow, Loader } from "semantic-ui-react";
import "./gridTemplate.css";
import CardComponente from "../cards";
import React from "react";
import { useAxios } from "../../../hooks/useAxios";

export default function GridTemplate({ descricao }) {
  const { data } = useAxios(
    `http://localhost:8080/api/produto/mais-baratos/${descricao}`
  );

  return (
    <div className="background-grid">
      <Grid columns={5}>
        <GridRow>
          {data ? (
            <>
              {data.map((produto) => {
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
