import {
  Card,
  Image,
  CardContent,
  CardDescription,
  CardHeader,
  Icon,
} from "semantic-ui-react";
import "./cards.css";

export default function CardComponent({imageUrl, titulo, descricao, valorUnitario}) {
  return (
    <Card>
      <Image src={imageUrl} wrapped ui={false} />
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
