import React from 'react';
import ReactDOM from 'react-dom';
import firestore from './app/components/EndPoint/firestore';
import Navigation from '../src/Navigation';


export default class App extends React.Component {
  state = {
    authenticated: false,
  };
  componentDidMount() {
    firestore.auth().onAuthStateChanged((authenticated) => {
      authenticated
        ? this.setState(() => ({
            authenticated: true,
          }))
        : this.setState(() => ({
            authenticated: false,
          }));
    });
  }
  render() {
    return <Navigation authenticated={this.state.authenticated} />;
  }
 }

ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
  
