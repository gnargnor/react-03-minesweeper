import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as gameActions from '../actions/gameActions';
import '../styles/square.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(clickedSquare){
        return this.props.actions.handleMinefieldClick(clickedSquare);
    }

    render() {
        return (
            <button
                className="square"
                onClick={() => this.handleClick(this.props.square)}
            >{this.props.square.hasBeenClicked?this.props.square.minesNearby:""}</button>
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
        actions: bindActionCreators(gameActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Square);