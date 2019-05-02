import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firestore from '../src/app/components/EndPoint/firestore';
import { Row, Container, Col, Form, Card } from 'react-bootstrap';
import Boton from '../src/app/components/Boton/Boton';
import './Login.css'

class Login extends Component {
 state = {
   email: '',
   password: '',
   error: null,
 };

handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };
handleSubmit = (event) => {
   event.preventDefault();
   const { email, password } = this.state;
firestore
     .auth()
     .signInWithEmailAndPassword(email, password)
     .then((user) => {
       this.props.history.push('/');
       console.log();
     })
     .catch((error) => {
       this.setState({ error: error });
     });
 };



 
 render() {
   const { email, password, error } = this.state;
   return (




<Container>
     <br/> <br/> <br/>
     <Row className="show-grid">
     <Col lg={3}></Col>
     <Col xs={12} md={12} lg={6}>
    
       {error ? (

         <h4>{error.message}</h4>
       
       ) : null}

    <Card style={{border:'none', boxShadow:'5px 6px 8px 0px #ccc'}}>
      <Form onSubmit={this.handleSubmit}>
      <Card.Header className="zpanel-login">
      <div className="contenedor-icono"> <i className="material-icons">dashboard</i><h2>ZPanel Admin </h2></div>
      </Card.Header>
      <Container>
      
      <Card.Body>
     
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Usuario</Form.Label>
    <Form.Control type="email"  name="email" placeholder="Ingrese usuario" value={email} onChange={this.handleInputChange}/>

  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name="password" value={password}
               onChange={this.handleInputChange} />
  </Form.Group>
  <Form.Group controlId="formBasicChecbox">
  </Form.Group>
<Boton clase="boton gradient" nombre="Ingresar" type="submit" children="Ingresar" />
  </Card.Body>
  </Container>
</Form>
</Card>

</Col>       
   </Row>
 </Container>

   );
 }
}
export default withRouter(Login);