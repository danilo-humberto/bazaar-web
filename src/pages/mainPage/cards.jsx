import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "semantic-ui-react";
import "./cards.css";
import { Link } from "react-router-dom";

export default function CardComponent({id, imageUrl, titulo, valorUnitario}) {
  return (
    <Link to={`/detailsProduct/${id}`}>
      <Card style={{height: '400px'}}>
        <img src={imageUrl} alt="" className="image-product" loading="lazy"/>
        <CardContent>
          <CardHeader>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorUnitario)}</CardHeader>
          <CardDescription>
            {titulo}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
