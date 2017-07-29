import React from 'react';
import {connect} from 'react-redux';
import Row from './row';
import '../styles/minefield.css';

class Minefield extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowNumber: 0
        };
    }

    renderRow(row, index) {
        return (
            <span>
                Row {index}:
                <Row rowNumber={index}/>
            </span>
        );
    }

    render() {
        return (
            <div className="minefield">
                {this.props.rowsArray.map(this.renderRow)}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        rowsArray: state.rowsArray
    };
}

function mapDispatchToProps(dispatch){
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Minefield);