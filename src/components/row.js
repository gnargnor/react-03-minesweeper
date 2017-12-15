import React from 'react';
import { connect } from 'react-redux';
import Square from './square';
import '../styles/minefield.css';

class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    createSquares(){
        let squares = this.props.numColumns;
        return Array(squares).fill(null).map((square, index) => {
            return this.renderSquare(square, index)
        });
    }

    renderSquare(square, index) {
        let currentRow = this.props.row;
        let numColumns = this.props.numColumns;
        let currentId = (currentRow * numColumns) + index;
        return (
            <Square row={currentRow} column={index} key={currentId} id={currentId}/>
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
    return {
        row: ownProps.row,
        numColumns: state.settings.columns
    };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Row);