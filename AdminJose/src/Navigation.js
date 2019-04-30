import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Home from '../src/app/components/Home/Home';
import Stock from '../src/app/components/Stock/Stock';
import Clientes from '../src/app/components/Clientes/Clientes';
import Ventas from '../src/app/components/Ventas/Ventas';
import Desperdicios from '../src/app/components/Desperdicios/Desperdicios';
import Root from './app/Root'
import Movimientos from './app/components/Movimientos/Movimientos';




class Navigation extends Component {
 render() {
   return (
     <Router>
         
        
<Switch>

           
           <Route authenticated={this.props.authenticated} path="/login" component={Login} />
           <Root>
           <ProtectedRoute authenticated={this.props.authenticated} exact path="/" component={Home} />
           <ProtectedRoute authenticated={this.props.authenticated} path="/stock" component={Stock} />
           <ProtectedRoute authenticated={this.props.authenticated} path="/clientes" component={Clientes} />
           <ProtectedRoute authenticated={this.props.authenticated} path="/ventas" component={Ventas} />
           <ProtectedRoute authenticated={this.props.authenticated} path="/desperdicios" component={Desperdicios} />
           <ProtectedRoute authenticated={this.props.authenticated} path="/movimientos" component={Movimientos} />
          </Root>
         </Switch>
    
     </Router>
   );
 }
}
export default Navigation;