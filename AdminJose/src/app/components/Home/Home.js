import React from 'react';
import { Col, Row, Card, ProgressBar, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Home.css';

import { connection } from '../EndPoint/firestore';

export default class Home extends React.Component{
    constructor () {
        super()
        this.unsubscribe = null
        this.clients = connection.collection('clientes')
        this.sales = connection.collection('ventas')
        this.stock = connection.collection('stock')
        this.state = {
            products: [],
            stock: 0,
            sales: 0,
            clients: 0,
            desp: 0
        }
    }

    getSizeStock = (s) => {
        var quantity = 0
        const prod = []
        s.forEach(element => {
            quantity = quantity + parseInt(element.data().cant)
            prod.push({
                doc: element.data()
            })
        });
        this.setState({
            products: prod,
            stock: quantity
        })
    }

    setData = (querySnapshot, collection) => {
        switch(collection) {
            case 'clients':
            this.setState({
                clients: querySnapshot.size
            })
            break;
            case 'sales':
            this.setState({
                sales: querySnapshot.size
            })
            break;
            case 'desp':
            this.setState({
                desp: querySnapshot.size
            })
            break;
            default: 
                break;
        }
    }
    
    componentDidMount() {
        this.unsubscribe = this.clients.get().then(snap => this.setData(snap, 'clients'));
        this.unsubscribe = this.sales.get().then(snap => this.setData(snap, 'sales'));
        this.unsubscribe = this.stock.get().then(snap => this.setData(snap, 'desp'));
        this.unsubscribe = this.stock.get().then(snap => this.getSizeStock(snap));
    }

    render(){
        return(
            <div className="container">
            <br/>
            
              <h4 className="center-text">HOME</h4>
              <br/>
              <Row> 
                <Col sm><Link to={'/stock'}><Card className="card-body card1">
                <h4>Stock</h4>
                <h1>{this.state.stock}<i className="material-icons">bar_chart</i></h1>
                </Card></Link></Col>

                <Col sm><Link to={'/ventas'}><Card className="card-body card4"><h4>Ventas</h4>
                <h1>{this.state.sales} <i className="material-icons">timeline</i></h1></Card></Link></Col>

                <Col sm><Link to={'/clientes'}><Card className="card-body card2"><h4>Clientes</h4>
                <h1>{this.state.clients}<i className="material-icons">how_to_reg</i> </h1></Card></Link></Col>
               
                <Col sm><Link to={'/desperdicios'}><Card className="card-body card3"><h4>Desperdicios</h4>
                <h1>{this.state.desp} <i className="material-icons">restore_from_trash</i></h1>
                </Card></Link></Col>

          
                </Row>
               
                <Row>
                    <Col lg>
                        <Card style={{height:"auto", boxShadow: 'rgb(204, 204, 204) 9px 8px 15px 4px' }}className="card5">
                        <Container>
                            {this.state.products.map( (e, index=0) =>
                                <div key={index+1}>
                                <br></br>
                                <ProgressBar key={index+1} 
                                             animated 
                                             now={e.doc.cant*100/1000} 
                                             label={e.doc.nomb} 
                                />
                                </div>
                            )}
                            </Container>
                        </Card>
                    </Col>
                </Row>
             
            </div>
        );
    }
}
