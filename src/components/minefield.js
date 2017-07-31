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

    createRows(numRows) {
        const rows = new Array(numRows).fill(null);
        return rows.map((row, index) => this.renderRow(row, index));
    }

    renderRow(row, index) {
        return (
            <span>
                <Row />
            </span>
        );
    }

    render() {
        return (
            <div className="minefield">
                {this.createRows(this.props.rows)}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        rows: state.settings.rows
    };
}

function mapDispatchToProps(dispatch){
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Minefield);