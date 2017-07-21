import React from 'react';
import Square from './square';
import '../styles/minefield.css';

export default class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="row">
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
            </div>
        );
    }
}