import React from 'react';
import Row from './row';
import '../styles/minefield.css';

export default class Minefield extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderRow(y) {
        return (
            <Row
            squares={this.props.rows[y]}
            onClick={()=>{this.props.onClick()}}
            />
        );
    }

    render() {
        return (
            <div className="minefield">
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
                {this.renderRow(5)}
                {this.renderRow(6)}
                {this.renderRow(7)}
                {this.renderRow(8)}
                {this.renderRow(9)}
            </div>
        )
    }
}