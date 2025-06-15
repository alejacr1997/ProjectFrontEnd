import {Card, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function CardP({datos}){
    return (
      <>
    <Card bg={datos.bgcolor} text={datos.txtcolor} style={{ width: '32rem'} }>
       <Card.Header style={{ backgroundColor: "white", color: "black", fontSize: 20}}>{datos.header}</Card.Header>
      <Card.Body>
         {datos.body}        
      </Card.Body>
    </Card>
    </>    
    );    
  }

  export default CardP;