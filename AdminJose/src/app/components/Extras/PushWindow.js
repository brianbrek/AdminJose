import React, { Component } from 'react';
import { connection } from './firestore';
import { Button, Modal } from 'react-bootstrap';

class PushWindow extends Component {

  constructor(props) {
    super(props);
    this.ref = connection.collection('stock');
    this.state = {
      nomb: '',
      desc: '',
      cant: '',
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  update = () => {
    const { nomb, desc, cant } = this.state;
    this.ref.doc(this.props.identify).update({
      nomb,
      desc,
      cant
    })
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    const { nomb, desc, cant } = this.state;

    if(this.props.propertie === 'Agregar') {
      this.ref.add({
        nomb,
        desc,
        cant
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    }else{
      this.update();
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleClose() {
    this.setState({ show: false });
  }
  
  handleShow() {
    this.setState({ show: true });
  }

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
        <Modal.Title>Agregar producto</Modal.Title>
      </Modal.Header>
      <br/>
        <div className="panel panel-default">
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="nomb">Producto:</label>
                <input type="text" 
                       className="form-control" 
                       name="nomb" value={nomb} 
                       onChange={this.onChange} 
                       placeholder="Nombre del producto" />
              </div>
              <div className="form-group">
                <label for="desc">Descripcion:</label>
                <input type="text" 
                       className="form-control" 
                       name="desc" 
                       value={desc} 
                       onChange={this.onChange} 
                       placeholder="Descripcion" 
                />
              </div>
              <div class="form-group">
                <label for="cant">Cantidad</label>
                <input type="number" 
                       className="form-control" 
                       name="cant" 
                       value={cant} 
                       onChange={this.onChange} 
                       placeholder="Cantidad" 
                />
              </div>
              <br/>
              <Modal.Footer>
              <Button  
                  type="submit" 
                  onClick={this.handleClose} 
                  className="boton gradient" 
                  onSubmit 
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

export default PushWindow;