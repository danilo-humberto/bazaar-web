import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import "./gridTemplate.css";
import CardComponente from "../cards";

export default function GridTemplate() {
  return (
    <div className="background-grid">
      <Grid columns={5}>
        <GridRow>
          <GridColumn>
            <CardComponente />
          </GridColumn>
          <GridColumn>
            <CardComponente />
          </GridColumn>
          <GridColumn>
            <CardComponente />
          </GridColumn>
          <GridColumn>
            <CardComponente />
          </GridColumn>
          <GridColumn>
            <CardComponente />
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}
