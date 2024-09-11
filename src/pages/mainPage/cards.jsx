import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "semantic-ui-react";
import "./cards.css";

export default function CardComponent({id, imageUrl, titulo, valorUnitario}) {
  return (
    <Link to={`/detailsProduct/${id}`}>
      <Card style={{height: '440px'}}>
        <img src={`http://localhost:8080/static/uploaded-imgs/${imageUrl}`} alt="" className="image-product" loading="lazy"/>
        <CardContent style={{border: 'none'}}>
          <CardHeader>{titulo}</CardHeader>
          <CardDescription className="card-description-main-product">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorUnitario)}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
