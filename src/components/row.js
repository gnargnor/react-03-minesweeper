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

    createSquares(squares){
        return squares.map((square, index) => {
            return this.renderSquare(square, index);
        });
    }

    renderSquare(square, index) {
        return (
            <Square square={square} key={square.id}/>
        );
    }

    render() {
        return (
            <div className="row">
                {this.createSquares(this.props.squares)}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    let row = ownProps.row;
    let minefield = state.settings.minefield;
    let squares = minefield[row];
    console.log(squares);
    return {
        squares
    };
}

function mapDispatchToProps(dispatch){
    return {
       dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Row);

{/* <Square
    value={this.props.squares[x]}
    onClick={() => this.props.onClick(x)}
/> */}