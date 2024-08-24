import {
  Card,
  Image,
  CardContent,
  CardDescription,
  CardHeader,
  Icon,
} from "semantic-ui-react";
import "./cardsProduct.css";

export default function CardsProduct({imageUrl, titulo, valorUnitario}) {
  return (
    <Card>
      <Image src={imageUrl} wrapped ui={false} />
      <CardContent>
        <CardHeader>{valorUnitario}</CardHeader>
        <CardDescription>
          {titulo}
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
