import React from 'react';
import firebase from 'firebase';

const logOutUser = () => {
 firebase.auth().signOut();
};
const LogOut = () => {
 return <button className="boton gradient logout" onClick={logOutUser} > Salir</button>;
};
export default LogOut;