/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "semantic-ui-react";
import "./cardsProduct.css";

export default function CardsProduct({id, imageUrl, titulo, valorUnitario}) {
  return (
    <Link to={`/detailsProduct/${id}`}>
      <Card>
        <img src={`http://localhost:8080/static/uploaded-imgs/${imageUrl}`} wrapped ui={false} className="image-product-search"/>
        <CardContent>
          <CardHeader>{titulo}</CardHeader>
          <CardDescription className="card-description-product">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorUnitario)}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
