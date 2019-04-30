import React from 'react';
import { Col, Row, Table, Button, Card } from 'react-bootstrap';
import './Stock.css';
import ModalView from '../Modal/Modal';
import { connection } from '../EndPoint/firestore';

export default class Stock extends React.Component{

constructor() {
  super();
  this.path = 'stock';
  this.ref = connection.collection(this.path);
  this.unsubscribe = null;
  this.state = {
    show: false,
    nomb: '',
    desc: '',
    cant: 0,
    desp: 0,
    boards: []
  };
}

onCollectionUpdate = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    const { nomb, emp, desc, cant, desp } = doc.data();
    boards.push({
      key: doc.id,
      doc, // DocumentSnapshot
      nomb,
      emp,
      desc,
      cant,
      desp
    });
  });
  this.setState({
    boards
  });
}

componentDidMount() {
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
} 

onChange = (e) => {
  const state = this.state
  state[e.target.name] = e.target.value;
  this.setState(state);
}

render(){
    return( 
      <>
      <br/>
      <Card>   
    <div className="container">
    <br/>
      <h4 className="center-text">PRODUCTOS </h4>
      <ModalView
        propertie="Agregar" 
        path={this.path}
        quantity={0}>
      </ModalView>
      <br/>
      <br/>
      <Row>
        <Col lg={12} sm={12}>
        <Table 
          className="table-background" 
          responsive bordered hover
        >
      <thead>
      <tr>
        <th>Producto</th>
        <th>Descripcion</th>
        <th>Cantidad(Kg/cant)</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {this.state.boards.map(board =>
      <tr key={board.key}>
        <td>{board.nomb}</td>
        <td>{board.desc}</td>
        <td>{board.cant}</td>
        <td><ModalView 
              propertie="Editar" 
              identify={board.key} 
              path={this.path}
              collection="stock"
              quantity={board.desp}>
            </ModalView>
        </td>
        <td>
        <Button 
              className="boton eliminar" 
              onClick={() => { if (window.confirm('¿Seguro queres eliminar este documento?')) this.ref.doc(board.key).delete()} }
            ><i className="material-icons">close</i>
            </Button>
            </td>
      </tr>
      
      )}
      </tbody>
      </Table>
      </Col>
      </Row>
    </div>
    </Card>   
        </>
    );
  }
}




