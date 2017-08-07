import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as minefieldActions from '../actions/minefieldActions';
import '../styles/square.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(clickedSquare){
        console.log(clickedSquare);
        this.props.actions.handleMinefieldClick(clickedSquare);
    }

    render() {
        return (
            <button
                className="square"
                onClick={this.handleClick(this.props.square)}
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
        actions: bindActionCreators(minefieldActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Square);