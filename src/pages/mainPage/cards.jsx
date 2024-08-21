import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Icon,
} from "semantic-ui-react";
import "./cards.css";
import { Link } from "react-router-dom";

export default function CardComponent({id, imageUrl, titulo, descricao, valorUnitario}) {
  return (
    <Link to={`/detailsProduct/${id}`}>
      <Card>
        <img src={imageUrl} alt="" className="image-product" loading="lazy"/>
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
    </Link>
  );
}
