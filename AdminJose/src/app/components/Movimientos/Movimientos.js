import React from 'react';
import { Navbar, FormControl, Form, Button, Row, Col, Table, Card, Container } from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { connection } from '../EndPoint/firestore';

export default class Movimientos extends React.Component{

constructor() {
  super();
  this.ref = connection.collection('ventas');
  this.state = {
    search: '',
    total: 0,
    boards : []
  };
}

onChange = (e) => {
    e.preventDefault();
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({state});
}

queryExecute = () => {

    const boards = []
    this.ref.where("nomb", "==", this.state.search).get()
    .then( (s) => {
        s.docs.forEach(doc => {
            const { nomb, fecha, total, saldo, stock, haber } = doc.data();
            boards.push({
                key: doc.id,
                nomb,
                fecha,
                total,
                saldo,
                stock,
                haber
            });
        })
    })
    .catch((error) => {
        console.error("Error: ", error);
    });
    this.setState({
        boards
    })
}

calculateTotal = () => {
  var sum = 0;
  for(var i=0;i<this.state.boards.length;i++){
    this.setState({total: sum += this.state.boards[i].saldo});
  }
}

render(){
    const { search } = this.state;
    return(    
        <>
             <br/>
 <Card style={{zIndex:"1"}}>
        <Navbar className="bg-light justify-content-between">
            <Form inline>   
                <h5 >Ingrese el cliente a buscar</h5>
            </Form>
            <Form inline>
                <FormControl type="text" name="search" value={search} placeholder="Buscar cliente" onChange={this.onChange} className=" mr-sm-2" />
                <Button onClick={() => this.queryExecute()}>Consultar</Button>
            </Form>
        </Navbar>
        </Card>
        <br/>
<Card  id="table-to-xls" >
        <div className="container">
        <br/>
       
          <h4 className="center-text">MOVIMIENTOS DE CLIENTES</h4>
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
            <th>Haber</th>
            <th>Total</th>
            <th>Saldo</th>
          </tr>
          </thead>
          <tbody>
          {this.state.boards.map(board =>
          <tr key={board.key}>
            <td>{board.fecha}</td>
            <td>{board.nomb}</td>
            <td>{board.stock.map((i, index=0) => <li key={index+1}>{i.nomb} - Cant: {i.cant} - P/unit: ${i.punit}</li>)}</td>
            <td>{board.haber}</td>
            <td>{board.total}</td>
            <td>$ {board.saldo}</td>
          </tr>
          )}
          </tbody>
            <br/>
          <button className="gradient boton" onClick={this.calculateTotal}>Calcular saldo</button>
        
        <h3>Total: {this.state.total} </h3>
          </Table>
          </Col>
          </Row>
       
        </div>
            
        </Card>
        <br/>
        <Container>
          <Row>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Generar comprobante"
          />
            </Row>
            </Container>
                   

        </>
    );
  }
}