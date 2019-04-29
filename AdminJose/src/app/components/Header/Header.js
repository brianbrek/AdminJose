import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import './Header.css';
import Fecha from '../../../Fecha';
import {NavLink} from 'react-router-dom';
import LogOut from '../../../LogOut';


export default class Header extends React.Component{
    render(){
        return(
<Navbar collapseOnSelect expand="lg" className="border-bottom" bg="light" variant="light" style={{boxShadow:'rgb(204, 204, 204) 7px 2px 10px 0px'}}>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    <div className="list-group list-group-flush oculto">
            <NavLink to="/"><Nav className="contenedor-icono" >
           Home</Nav></NavLink>
            {this.props.authenticated ? (
                 <span>
                 </span>

            ) : (
              <>
              <NavLink to="/stock"> <Nav className="contenedor-icono">Stock</Nav></NavLink>
              
              <NavLink to="/clientes"> <Nav className="contenedor-icono" >Clientes</Nav></NavLink>
              
              <NavLink to="/ventas"><Nav className="contenedor-icono" >Ventas</Nav></NavLink>
              
              <NavLink to="/desperdicios"><Nav className="contenedor-icono" >Desperdicios</Nav></NavLink>

              <NavLink to="/Movimientos"><Nav className="contenedor-icono" >Movimientos</Nav></NavLink>
                     
                 </>
           )}

              <br/>
            <Nav.Link> <LogOut /></Nav.Link>
            </div>
            

   
    </Nav>
   < Fecha/>
  </Navbar.Collapse>
</Navbar>
    
        );
    }
}
