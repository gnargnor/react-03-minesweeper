import React from 'react';
import Square from './square';
import '../styles/minefield.css';

export default class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderSquare(x) {
        return (
            <Square
                value={this.props.squares[x]}
                onClick={() => this.props.onClick(x)}
            />
        );
    }

    render() {
        return (
            <div className="row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        );
    }
}