import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { connection } from '../EndPoint/firestore';
import './Factura.css';
import ReactToPrint from 'react-to-print';


class Factura extends Component {

  constructor(props) {
    super(props);
    this.ref = connection.collection('ventas');
    this.clients = connection.collection('clientes');
    this.unsubscribe = null;
    this.state = {
      data: {},
      dir: '',
      tel: '',
      id: '',
      show: false,
      fecha: '',
      nomb: '',
      imp: 0,
      total: 0,
      stock: [],
      boards: [],
    };
  }

  setClientAttr = (name) => {
    this.clients.where("nomb", "==", name).limit(1).get()
    .then( (s) => {
        s.docs.forEach(doc => {
            const { dir, tel } = doc.data();
            this.setState({
                dir,
                tel
            })
        })
    })
  }

  componentDidMount() {
    this.setClientAttr(this.props.identify.nomb)
  }

    render() {
        return (
          <>
          <ReactToPrint
          trigger={() => <a style={{}} href="#"><i style={{color:'rgb(56, 104, 252)', fontSize:'28px'}} className='material-icons'>print</i></a>}
          content={() => this.componentRef}
        />
            <Container style={{display:'none'}}>
            <div ref={el => (this.componentRef = el)}>
             <div class="invoice-box">
        <Table>
            <>
            <tr key={this.props.identify.key} class="top">
                <td colspan="2">
                
                    <table>
                        <tr>                          
                          <td className="title">
                              <h1>Don Jose</h1>
                             </td>                          
                            <td>         
                               Factura: {this.props.identify.key}<br/>             
                               Fecha:{this.props.identify.fecha}<br/>                               
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr className="information">
                <td colspan="2">
                    <table>
                        <tr>
                            <td>
                                CABA<br/>
                                12345 Sunny Road<br/>
                                Sunnyville, CA 12345
                            </td>
                            <td>
                               Cliente: {this.props.identify.nomb}<br/>
                               Direccion: {this.state.dir}<br/>
                               Tel: {this.state.tel}<br/>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
         
            <tr className="heading">
                <td>
                   Producto
                </td>
                <td>
                    Precio unitario
                </td>
            </tr>
          
            <tr className="item">
            <td>{this.props.identify.stock.map((i, index=0) => <p key={index+1}>{i.nomb} - Cant: {i.cant} </p>)}</td>
                
            <td>{this.props.identify.stock.map((i, index=0) => <p key={index+1}> ${i.punit}</p>)}</td>
            </tr>
            
            <tr className="total">
                <td>Total</td>
                <td>$ {this.props.identify.total}</td>
            </tr>
            </>
            </Table>
        </div>
        </div>
        </Container>
              </>
        );
       
    }

}

export default Factura;