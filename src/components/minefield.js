import React from 'react';
import { connect } from 'react-redux';
import Row from './row';
import '../styles/minefield.css';

class Minefield extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    createRows(minefield) {
        let rows = this.props.numRows;
        return Array(rows).fill(null).map((row, index) => {
            //row is unnecessary to pass as argument, remove later
            return this.renderRow(row, index);
        });
        // return minefield.map((row, index) => {
        //     return this.renderRow(row, index);
        // });
    }

    renderRow(row, index) {
        return (
            <Row row={index} key={index} />
        );
    }

    render() {
        return (
            <div className="minefield">
                {this.createRows()}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        minefield: state.settings.minefield,
        numRows: state.settings.rows,
        numColumns: state.settings.columns
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Minefield);