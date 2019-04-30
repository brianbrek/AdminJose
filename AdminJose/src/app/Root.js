import React from 'react';
import Header from '../app/components/Header/Header';
import Sidenav from '../app/components/Sidenav/Sidenav';
import { withRouter } from 'react-router-dom';

import { connection } from '../app/components/EndPoint/firestore';

class Root extends React.Component{
    constructor(props){
        super(props)
        this.ref = connection.collection('stock')
        this.unsubscribe = null
        this.state = {
            stock: []
        }
    };

    onCollectionUpdate = (querySnapshot) => {
        const stock = [];
        querySnapshot.forEach((doc) => {
            const { nomb, emp, desc, cant, desp } = doc.data();
            stock.push({
            key: doc.id,
            doc, // DocumentSnapshot
            nomb,
            emp,
            desc,
            cant,
            desp
            });
        });
        this.setState({
            stock
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    } 
        
    render(){

        return(
            <div className="d-flex" id="wrapper"> 
                <Sidenav stock={this.state.stock}/>
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
