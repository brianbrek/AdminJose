import React from 'react';
import { Col, Row, Table, Card, Button } from 'react-bootstrap';
import ModalV from './ModalV';
import { connection } from '../EndPoint/firestore';
import Factura from '../Factura/Factura'


export default class Ventas extends React.Component{

constructor() {
  super();
  this.ref = connection.collection('ventas');
  this.unsubscribe = null;
  this.state = {
    id: '',
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

calculateId = () => {
  this.ref.get().then(snap => {
    var date = new Date()
    this.setState({id:  date.getHours().toString() +
                        date.getMinutes().toString() +
                        date.getSeconds().toString() + '-' +
                        (snap.size+1).toString()
    })
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
      {this.calculateId()}
     <br/>
     <Card>
    <div className="container">
    <br/>
      <h4 className="center-text">VENTAS </h4>
      <ModalV 
        propertie="Agregar" 
        path="ventas"
        collection={this.state.boards}
        size={this.state.id}>
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
        <th>id</th>
        <th>Fecha</th>
        <th>Cliente</th>
        <th>Productos</th>
        <th>Total</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        {/*<td>{board.key.substring(board.key.search('-')+1 ,board.key.length)}</td>*/}
      {this.state.boards.map((board, id) =>
        <tr key={board.key}>
          <td>{board.key}</td>
          <td>{board.fecha}</td>
          <td>{board.nomb}</td>
          <td>{board.stock.map((i, index=0) => <li key={index+1}>{i.nomb} - Cant: {i.cant} - P/unit: ${i.punit}</li>)}</td>
          <td>$ {board.total}</td>
          <td> <Factura identify={board}/></td>
          <td><Button 
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