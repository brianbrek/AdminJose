import React from 'react';
import { Col, Row, Table, Card } from 'react-bootstrap';
import ModalV from './ModalV';
import { connection } from '../EndPoint/firestore';


export default class Ventas extends React.Component{

constructor() {
  super();
  this.ref = connection.collection('ventas');
  this.unsubscribe = null;
  this.state = {
    show: false,
    fecha: '',
    nomb: '',
    dir: '',
    tel: '',
    haber: 0,
    saldo: 0,
    imp: 0,
    total: 0,
    stock: [],
    boards: [],
  };
}

onCollectionUpdate = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    const { nomb, dir, tel, debe, haber, saldo, imp, fecha, stock, total } = doc.data();
    boards.push({
      key: doc.id,
      doc, // DocumentSnapshot
      nomb,
      dir,
      tel,
      debe,
      haber,
      saldo,
      imp,
      fecha,
      stock,
      total
    });
  });
  this.setState({
    boards,
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
      <h4 className="center-text">VENTAS </h4>
      <ModalV 
        propertie="Agregar" 
        path="ventas"
        collection={this.state.boards}>
      </ModalV>
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
        <th>Fecha</th>
        <th>Cliente</th>
        <th>Productos</th>
        <th>Total</th>
        <th>Haber</th>
        <th>Saldo</th>
      </tr>
      </thead>
      <tbody>
      {this.state.boards.map(board =>
      <tr key={board.key}>
        <td>{board.fecha}</td>
        <td>{board.nomb}</td>
        <td>{board.stock.map((i, index=0) => <li key={index+1}>{i.nomb} - Cant: {i.cant} - P/unit: ${i.punit}</li>)}</td>
        <td>{board.total}</td>
        <td>{board.haber}</td>
        <td>$ {board.saldo}</td>
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