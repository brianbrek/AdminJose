import React, { Component } from 'react';
import { connection } from '../EndPoint/firestore';
import { Button, Modal } from 'react-bootstrap';
import "./Modal.css";

export default class ModalView extends Component {

  constructor(props) {
    super(props);
    this.ref = connection.collection(this.props.path);
    this.state = {
      nomb: '',
      desc: '',
      cant: 0,
      desp: 0,
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  //OnSubmit Action, add and update

  updateData = () => {
    const { cant, desp } = this.state;

    this.ref.doc(this.props.identify).update({
      cant,
      desp
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  addData = () => {
    const { nomb, desc, cant, desp } = this.state;
    
    this.ref.add({
      nomb,
      desc,
      cant,
      desp
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

    if(this.props.collection === 'desperdicios' && e.target.name === 'desp') {
      this.setState({
        cant: this.props.quantity - e.target.value,
        desp: parseInt(this.props.qdesp) + parseInt(e.target.value)
      });
    } else {
      this.setState({desp: this.props.quantity});
    }
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
    const { nomb, desc, cant } = this.state;

    return (
      <>

    <Button className="boton gradient" onClick={this.handleShow}>
     {this.props.propertie}
    </Button>

    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Body>
      <div className="container">
      <Modal.Header closeButton>
        <Modal.Title>{this.props.propertie} producto</Modal.Title>
      </Modal.Header>
      <br/>
        <div className="panel panel-default">
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className={this.props.propertie === "Editar" ? 'oculto' : 'form-group'}>
                <label>Producto:</label>
                <input type="text" 
                       className="form-control" 
                       name="nomb" value={nomb} 
                       onChange={this.onChange} 
                       placeholder="Nombre del producto" />
              </div>
              <div className={this.props.propertie === "Editar" ? 'oculto' : 'form-group'} >
                <label>Descripcion:</label>
                <input 
                      type="text" 
                       className="form-control" 
                       name="desc" 
                       value={desc} 
                       onChange={this.onChange} 
                       placeholder="Descripcion" 
                />
              </div>

              
              <div className="form-group">
                <label>Cantidad</label>
                {
                  this.props.collection === 'desperdicios'
                  ?
                  <>
                  <input type="number" 
                        className="form-control" 
                        id="inpDesp"
                        name="desp" 
                        
                        onChange={this.onChange} 
                        placeholder="Cantidad" 
                  />
                  <br></br>
                  <Button className="boton cerrar" 
                      onClick={() => (this.setState({desp: 0, cant: this.props.quantity}))} 
                  >Vaciar</Button>
                  </>
                  : 
                  <input type="number" 
                        className="form-control" 
                        name="cant" 
                        value={cant} 
                        onChange={this.onChange} 
                        placeholder="Cantidad" 
                  />
                }
              </div>
              <br/>
              <Modal.Footer>
              <Button disabled={ this.state.nomb === '' ? this.props.collection !== 'desperdicios' && this.props.propertie !== "Editar" : '' }
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