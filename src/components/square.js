import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/square.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    handleClick(e){
        alert(`${this.props.square.hasBeenClicked}`);
    }

    render() {
        return (
            <button
                className="square"
                row={this.props.square.row}
            />

        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        square: ownProps.square
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Square);