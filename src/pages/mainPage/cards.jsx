import {
  Card,
  Image,
  CardContent,
  CardDescription,
  CardHeader,
  Icon,
} from "semantic-ui-react";
import imageTeste from "../../assets/imageteste.jpeg";
import "./cards.css";

export default function CardComponent() {
  return (
    <Card>
      <Image src={imageTeste} wrapped ui={false} />
      <CardContent>
        <CardHeader>RS 20,00</CardHeader>
        <CardDescription>
          Matthew is a musician living in Nashville.
        </CardDescription>
      </CardContent>
      <CardContent extra>
        <div className="bottom">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Icon name="user circle outline" size="big"/>
            nome
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Icon name="map marker alternate" size="large"/>
            <div className="location">
              <span>Hoje, 14:45</span>
              <span>Recife, PE</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
