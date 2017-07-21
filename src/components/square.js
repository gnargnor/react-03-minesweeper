import React from 'react';
import '../styles/square.css';

export default class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMine: false,
            minesNearby: 0,
            hasBeenSwept: false,
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