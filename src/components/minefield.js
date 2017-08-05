import React from 'react';
import { connect } from 'react-redux';
import Row from './row';
import '../styles/minefield.css';

class Minefield extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowNumber: 0
        };
    }

    createRows(minefield) {
        return minefield.map((row, index) => this.renderRow(row, index));
    }

    renderRow(row, index) {
        return (
            <span>
                <Row key="index"/>
            </span>
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

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Minefield);