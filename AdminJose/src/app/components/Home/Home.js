import React from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Home.css';

export default class Home extends React.Component{
    render(){
        return(
           
         
            <div className="container">
            <br/>
            
              <h4 className="center-text">HOME</h4>
              <br/>
              <Row> 
                <Col sm><Link to={'/stock'}><Card className="card-body card1">
                <h4>Stock</h4>
                <h1>250<i className="material-icons">bar_chart</i></h1>
                </Card></Link></Col>

                <Col sm><Link to={'/clientes'}><Card className="card-body card2"><h4>Clientes</h4>
                <h1>30<i className="material-icons">how_to_reg</i> </h1></Card></Link></Col>
               
                <Col sm><Link to={'/desperdicios'}><Card className="card-body card3"><h4>Desperdicios</h4>
                <h1>100 <i className="material-icons">restore_from_trash</i></h1>
                </Card></Link></Col>

                <Col sm><Link to={'/ventas'}><Card className="card-body card4"><h4>Ventas</h4>
                <h1>40 <i className="material-icons">timeline</i></h1></Card></Link></Col>
                </Row>
               
                <Row>
            <Col lg><Card style={{height:"300px", boxShadow: 'rgb(204, 204, 204) 9px 8px 15px 4px' }}className="card4"><h1>hello</h1></Card></Col>
            </Row>
             
            </div>
           
        );
    }
}
