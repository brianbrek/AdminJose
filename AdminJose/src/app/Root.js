import React from 'react';
import Header from '../app/components/Header/Header';
import Sidenav from '../app/components/Sidenav/Sidenav';
import { withRouter } from 'react-router-dom';



class Root extends React.Component{
    
    render(){
        return(
            <div className="d-flex" id="wrapper"> 
            <Sidenav stock={11}/>
            <div id="page-content-wrapper">
              <Header/>
                <div className="container">
                    {this.props.children}
                </div>
           </div>
            </div>
           
        );
    }
}

export default withRouter(Root);
