import React from 'react';
import { Navbar, FormControl, Form, Button, Row, Col, Table, Card, Container } from 'react-bootstrap';
import { connection } from '../EndPoint/firestore';
import ReactToPrint from 'react-to-print';
import {ToastsContainer, ToastsStore} from 'react-toasts';

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
    .then(() => this.setState({boards}))
    .catch((error) => {
        console.error("Error: ", error);
    });
}

calculateTotal = () => {
  var sum = 0;
  for(var i=0;i<this.state.boards.length;i++){
    this.setState({total: sum += this.state.boards[i].saldo});
  }
}

render(){
    const { search } = this.state;
    console.log(this.state.boards)
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
                <ToastsContainer store={ToastsStore}/>
            </Form>
        </Navbar>
        </Card>
        <br/>
<Card ref={el => (this.movimientos = el)}>
        <div  className="container">
        <br/>
          <h4 className="center-text">MOVIMIENTOS DE CLIENTES</h4>
          <br/>
          <br/>
          <Row>
            <Col lg={12} sm={12}>
            <Table id="table-to-xls" 
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
          <ReactToPrint
          trigger={() => <a href="#">Imprimir Comprobante</a>}
          content={() => this.movimientos}
        />    
            </Row>
        </Container>
        </>
    );
  }
}
