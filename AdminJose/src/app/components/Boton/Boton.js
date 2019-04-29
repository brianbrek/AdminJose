import React from 'react';
import './Boton.css'

export default function Boton(props){
        return(
         <button className={props.clase}>{props.nombre}</button>
            
           
        );
    }