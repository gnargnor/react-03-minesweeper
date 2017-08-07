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
        return minefield.map((row, index) => {
            return this.renderRow(row, index);
        });
    }

    renderRow(row, index) {
        return (
            <Row row={row} key={index} />
        );
    }

    render() {
        return (
            <div className="minefield">
                {this.createRows(this.props.minefield)}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        minefield: state.settings.minefield
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Minefield);