import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "semantic-ui-react";
import "./cardsProduct.css";

export default function CardsProduct({imageUrl, titulo, valorUnitario, descricao}) {
  return (
    <Card>
      <img src={`http://localhost:8080/static/uploaded-imgs/${imageUrl}`} wrapped ui={false} className="image-product-search"/>
      <CardContent>
        <CardHeader>{titulo}</CardHeader>
        <CardDescription>
          {descricao}
        </CardDescription>
        <CardDescription className="card-description-product">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorUnitario)}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
