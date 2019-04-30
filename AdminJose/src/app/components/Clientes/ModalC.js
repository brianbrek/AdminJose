import React, { Component } from 'react';
import { connection } from '../EndPoint/firestore';
import { Button, Modal } from 'react-bootstrap';


export default class ModalC extends Component {

  constructor(props) {
    super(props);
    this.ref = connection.collection(this.props.path);
    this.state = {
      nomb: '',
      dir: '',
      tel: '',
      debe: 0,
      haber: 0,
      saldo: 0,
      productos: [],
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  updateData = () => {
    const { nomb, dir, tel, debe, haber, saldo } = this.state;

    this.ref.doc(this.props.identify).update({
        nomb,
        dir,
        tel,
        debe,
        haber,
        saldo
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  //OnSubmit Action, add and update

  addData = () => {
    const { nomb, dir, tel, debe, haber, saldo } = this.state;
    
    this.ref.add({
      nomb,
      dir,
      tel,
      debe,
      haber,
      saldo
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if(this.props.propertie === 'Agregar') {
      this.addData();
    }else{
      this.updateData();
    }
  }

  //Change state of constructor

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  //Modal action

  handleClose() {
    this.setState({ show: false });
  }
  
  handleShow() {
    this.setState({ show: true });
  }

  //Render main

  render() {
    const { nomb, dir, tel } = this.state;

    return (
      <>
    <Button className="boton gradient" onClick={this.handleShow}>
     {this.props.propertie}
    </Button>

    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Body>
      <div className="container">
      <Modal.Header closeButton>
        <Modal.Title>{this.props.propertie} cliente</Modal.Title>
      </Modal.Header>
      <br/>
        <div className="panel panel-default">
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Cliente:</label>
                <input type="text" 
                       className="form-control" 
                       name="nomb" value={nomb} 
                       onChange={this.onChange} 
                       placeholder="Nombre del cliente" />
              </div>
              <div className="form-grouyyp">
                <label>Direccion:</label>
                <input type="text" 
                       className="form-control" 
                       name="dir" 
                       value={dir} 
                       onChange={this.onChange} 
                       placeholder="Direccion (Calle - Altura)" 
                />
              </div>
              <div className="form-group">
                <label>Telefono</label>
                <input type="number" 
                    className="form-control" 
                    name="tel" 
                    value={tel} 
                    onChange={this.onChange} 
                    placeholder="Telefono" 
                />
              </div>
              <br/>
              <Modal.Footer>
              <Button disabled={ this.state.nomb === "" }
                  type="submit" 
                  onClick={this.handleClose} 
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