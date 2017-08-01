import React from 'react';
import { connect } from 'react-redux';
import Square from './square';
import '../styles/minefield.css';

class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    createSquares(numColumns){
        const squareInit = {
            key: 0,
            hasMine: false,
            hasBeenClicked: false,
            minesNearby: 0
        };
        const squares = Array(this.props.columns).fill(squareInit);
        return squares.map((square, index) => this.renderSquare(square, index));
    }

    renderSquare(square, index) {
        return (
            <Square key={index}/>
        );
    }

    render() {
        return (
            <div className="row">
                {this.createSquares(this.props.columns)}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        columns: state.settings.columns
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: true
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Row);

{/* <Square
    value={this.props.squares[x]}
    onClick={() => this.props.onClick(x)}
/> */}