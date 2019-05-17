import React, { Component } from 'react';
import { connection } from '../EndPoint/firestore';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import './ModalV.css';
import {ToastsContainer, ToastsStore} from 'react-toasts';


export default class ModalV extends Component {

  constructor(props) {
    super(props);
    this.ref = connection.collection(this.props.path);
    this.refClients = connection.collection('clientes');
    this.refProductos = connection.collection('stock');
    this.state = {
      improcedent: false,
      sum: 0,
      fecha: '',
      nomb: '',
      dir: '',
      tel: '',
      total: 0,
      haber: 0,
      saldo: 0,
      cant: 0,
      punit: 0,
      productsForm: [],
      stock: [],
      clients: [],
      show: false
    };
  }

  onClick = (e) => { 
    this.calculateTotal(); 
    this.handleClose();
   } 

  addData = () => {
    const { nomb, dir, tel, haber, total, stock, cant, punit } = this.state;
    var date = new Date()

    this.ref.add({
      fecha: date.getDate() + ' - ' + (date.getMonth()+1) + ' - ' + date.getFullYear(),
      nomb,
      dir,
      tel,
      haber,
      saldo: parseInt(this.state.total) - parseInt(this.state.haber),
      stock,
      cant,
      punit,
      total
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
    this.updateStock();
  }

  sumStock = () => {
    var s = 0
    this.state.stock.map( (e) =>
      s += parseInt(e.punit*e.cant)
    )
    return s
  }

  updateStock = () => {
    this.state.stock.forEach(element => {
      this.refProductos.where("nomb", "==", element.nomb).get()
      .then( (s) => {
          s.docs.forEach(doc => {
              this.mainUpdate(doc, element.cant);
          })
      })
      .catch((error) => {
          console.error("Error: ", error);
      });
    });
  }  

  mainUpdate = (doc, q) => {
    if (doc.data().cant - q > 0) {
      this.refProductos.doc(doc.id).update({
          cant: doc.data().cant - q
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    } else {
      alert("Venta no procedente, falta de stock")
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.addData();
    this.setState({stock: []})
  }

  changeSelecte = () => {
    var combo = document.getElementById("sel");
    var selected = combo.options[combo.selectedIndex].text;

    this.setState(state => {
      const list = state.stock.push({nomb: selected, cant: this.state.cant, punit: this.state.punit});
      return {
        list,
        value: '',
      };
    });

    ToastsStore.success("OK! Producto agregado a la venta");
  }

  onClientsUpdate = (querySnapshot) => {
    const clients = [''];
    querySnapshot.forEach((doc) => {
      const { nomb } = doc.data();
      clients.push({
        key: doc.id,
        nomb
      });
    });
    this.setState({
      clients
    });
  }

  onProductsUpdate = (querySnapshot) => {
    const productsForm = [''];
    querySnapshot.forEach((doc) => {
      const { nomb, cant, punit } = doc.data();
      productsForm.push({
        key: doc.id,
        nomb,
        cant,
        punit
      });
    });
    this.setState({
      productsForm
    });
  }

  componentDidMount() {
    this.unsubscribe = this.refClients.onSnapshot(this.onClientsUpdate);
    this.unsubscribe = this.refProductos.onSnapshot(this.onProductsUpdate);
  } 

  changeInput = () => {
    var combo = document.getElementById("sel2");
    var selected = combo.options[combo.selectedIndex].text;
    this.setState({nomb: selected});
  }

  onChange = (e) => {
    e.preventDefault();
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({state});
  }

  calculateTotal = () => {
    var tot = 0;

    for (var i=0; i<this.state.stock.length; i++) {
      tot += parseInt(this.state.stock[i].punit * this.state.stock[i].cant);
    }
    this.setState({total: tot})

  }

  //Modal action

  handleClose = () => {
    this.setState({ show: false });
  }
  
  handleShow = () => {
    this.setState({ show: true });
  }

  //Render main

  render() {
    const { cant, punit, haber } = this.state;
    
    return (
      <>
    <Button className="boton gradient" onClick={this.handleShow}>
     {this.props.propertie}
    </Button>

    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Body>
      <div className="container">
      <Modal.Header closeButton>
        <Modal.Title>{this.props.propertie} nueva venta</Modal.Title>
      </Modal.Header>
      <br/>
        <div className="panel panel-default">
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className={this.props.propertie === "Editar" ? 'oculto' : 'form-group'}>
                <label className='label-margin'>Cliente: </label>
                <select id="sel2" onClick={this.changeInput}>
                {
                  this.state.clients.map((client, index = 0) =>
                    <option key={index+1} value={client.nomb}>{client.nomb}</option>
                  )
                }
                </select>
              </div>
              <br/>
              <div className={this.props.propertie === "Editar" ? 'oculto' : 'form-group'}>
                <label className='label-margin'>Producto:</label>
                <select id="sel">
                {
                  this.state.productsForm.map((products, index = 0) => 
                    <option key={index+1} value={products.nomb}>{products.nomb}</option>
                  )
                }
                </select>
                </div> 
                <br/>
                <Row>
                  <Col>
                
                <label className={this.props.propertie === 'Editar' ? 'oculto' : 'label-margin'}>Cantidad (Kg/Cajas):</label>
                <input type="number" 
                    className={this.props.propertie === "Editar" ? 'oculto' : 'form-control'} 
                    name="cant" 
                    value={cant} 
                    onChange={this.onChange} 
                    placeholder="Cantidad" 
                />
            
                <br/>
                </Col>
                <Col>
                <label className={this.props.propertie === 'Editar' ? 'oculto' : 'label-margin'}>Precio unitario:</label>
                <input type="number" 
                    className={this.props.propertie === "Editar" ? 'oculto' : 'form-control'} 
                    name="punit" 
                    value={punit} 
                    onChange={this.onChange} 
                    placeholder="P/unitario" 
                />
              
                  </Col>
                  </Row>

                <Button style={{marginBottom:'12px'}} disabled={ this.state.punit < 0 || this.state.cant < 0 }
                  onClick={this.changeSelecte}
                  className={this.props.propertie === "Editar" ? 'oculto' : 'boton cerrar'}
                > Añadir</Button> 
                <ToastsContainer store={ToastsStore}/>
                
                {
                  this.state.stock.map( (e, i=0) => 
                    <li key={i+1}>{e.nomb} - Cant: {e.cant} - p/unit:$ {e.punit}</li>
                  )
                }
                <br/>
                Total: $ {this.sumStock()}
                  
               <Row>
                 <Col>
                 <br/>
                <div>
                <label className='label-margin'>Monto recibido:</label>
                <input
                      type="number" 
                      className="form-control" 
                      name="haber" 
                      value={haber} 
                      onChange={this.onChange} 
                      placeholder="Monto recibido" 
                  />
                </div>
                </Col>
                </Row>
         
              <br/>
              <Modal.Footer>
              <Button  disabled={ this.state.haber <= 0 || this.state.punit < 0 || this.state.cant < 0 || this.state.nomb === ''}
                  type="submit" 
                  onClick={this.onClick} 
                  className="boton gradient" 
                  onSubmit={this.onSubmit} 
              > {this.props.propertie}</Button>
              <Button className="boton cerrar" 
                      onClick={this.handleClose} 
              > Cerrar</Button>
        </Modal.Footer>
            </form>
          </div>
        </div>
      </div>
      </Modal.Body>
    </Modal>
    </>

    );
  }
}