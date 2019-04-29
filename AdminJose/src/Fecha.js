import React from 'react';

export default class Fecha extends React.Component {
    constructor() {
        super();

        var today = new Date(),
            date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

        this.state = {
            date: date
        };
    }

    render() {
        return (
            <div className='date'>
                <p>{this.state.date}</p>
            </div>
        );
    }
}