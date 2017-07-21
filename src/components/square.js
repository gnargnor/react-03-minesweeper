import React from 'react';
import '../styles/square.css';

export default class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <button className="square">
                69
            </button>
        )
    }
}