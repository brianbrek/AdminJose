import React from 'react';
import { Nav, Alert } from 'react-bootstrap';
import './Sidenav.css'
import {NavLink} from 'react-router-dom';
import LogOut from '../../../LogOut';


export default class Sidenav extends React.Component{
 

    render(){
        return(
            <div bg="light" variant="light" id="sidebar-wrapper">
            <div className="contenedor-icono sidebar-heading"> <i className="material-icons">dashboard</i>Admin Panel <p>v1.1</p></div>
            <div className="list-group list-group-flush">
            <NavLink to="/"><Nav className="contenedor-icono" >
            <i className="material-icons">home</i>HOME</Nav></NavLink>
        
              <NavLink to="/stock"> <Nav className="contenedor-icono"><i className="material-icons">check_box</i>STOCK</Nav></NavLink>
              <NavLink to="/clientes"> <Nav className="contenedor-icono" ><i className="material-icons">people</i>CLIENTES</Nav></NavLink>
              <NavLink to="/ventas"><Nav className="contenedor-icono" ><i className="material-icons">attach_money</i>VENTAS</Nav></NavLink>
              <NavLink to="/desperdicios"><Nav className="contenedor-icono" ><i className="material-icons">delete</i>DESPERDICIOS</Nav></NavLink>
              <NavLink to="/Movimientos"><Nav className="contenedor-icono" ><i className="material-icons">people</i>MOVIMIENTOS</Nav></NavLink>
              <br/>
              <ul> <LogOut /></ul> 
              {this.props.stock.map( (stk, i=0) =>
                    stk.cant <= 10 
                    ? 
                        <Alert key={i+1} variant="danger">Stock bajo - ({stk.nomb})</Alert> 
                    :
                         <span key={i+1}></span>
              )}
              
            </div>
            <br/>
            
            <div className="sidebar-footer"><Nav className="contenedor-icono" ><i className="material-icons">settings</i>  Powered by Zipic v1.0</Nav> </div>
          
          
          </div>
           
        );
    }
}
