import React from 'react';
import { Col, Row, Table, Button, Card } from 'react-bootstrap';
//import './Stock.css';
import ModalC from './ModalC';
import { connection } from '../EndPoint/firestore';

export default class Clientes extends React.Component{

constructor() {
  super();
  this.path = 'clientes';
  this.ref = connection.collection(this.path);
  this.unsubscribe = null;
  this.state = {
    show: false,
    nomb: '',
    dir: '',
    tel: '',
    debe: 0,
    haber: 0,
    saldo: 0,
    boards: []
  };
}

onCollectionUpdate = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    const { nomb, dir, tel, debe, haber, saldo } = doc.data();
    boards.push({
      key: doc.id,
      doc, // DocumentSnapshot
      nomb,
      dir,
      tel,
      debe,
      haber,
      saldo
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
      <h4 className="center-text">CLIENTES </h4>
      <ModalC 
        propertie="Agregar" 
        path={this.path}>
      </ModalC>
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
        <th>Cliente</th>
        <th>Direccion</th>
        <th>Telefono</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {this.state.boards.map(board =>
      <tr key={board.key}>
        <td>{board.nomb}</td>
        <td>{board.dir}</td>
        <td>{board.tel}</td>
        <td><ModalC 
              propertie="Editar" 
              identify={board.key} 
              path={this.path}> 
            </ModalC>
        </td>
        <td><Button 
              className="boton eliminar" 
              onClick={() => { if (window.confirm('¿Seguro queres eliminar este documento?')) this.ref.doc(board.key).delete() } }
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




