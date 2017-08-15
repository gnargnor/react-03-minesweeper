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

    createSquares(){
        let squares = this.props.numColumns;
        return Array(squares).fill(null).map((square, index) => {
            return this.renderSquare(square, index)
        })

        // return squares.map((square, index) => {
        //     return this.renderSquare(square, index);
        // });
    }

    renderSquare(square, index) {
        let currentRow = this.props.row;
        let numColumns = this.props.numColumns;
        return (
            <Square row={currentRow} column={index} key={currentRow * numColumns + index} id={currentRow * numColumns + index}/>
        );
    }

    render() {
        return (
            <div className="row">
                {this.createSquares()}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    // let row = ownProps.row;
    // let minefield = state.settings.minefield;
    // let squares = minefield[row];
    return {
        row: ownProps.row,
        numColumns: state.settings.columns
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