import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Icon,
} from "semantic-ui-react";
import "./cards.css";

export default function CardComponent({imageUrl, titulo, descricao, valorUnitario}) {
  return (
    <Card>
      <img src={imageUrl} alt="" className="image-product"/>
      <CardContent>
        <CardHeader>{valorUnitario}</CardHeader>
        <CardDescription>
          {titulo + " / " + descricao}
        </CardDescription>
      </CardContent>
      <CardContent extra>
        <div className="bottom">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="user circle outline" size="big" />
            nome
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
