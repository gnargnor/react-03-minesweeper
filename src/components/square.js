import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as gameActions from '../actions/gameActions';
import '../styles/square.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.handleContextMenu= this.handleContextMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.displaySquare = this.displaySquare.bind(this);
    }

    handleClick(e){
        return this.props.actions.handleMinefieldClick(this.props.square);
    }

    handleContextMenu(e){
        console.log(this.props);
        e.preventDefault();
        return this.props.actions.handleMinefieldRightClick(this.props.square);
    }

    displaySquare() {
        let currentSquare = this.props.square;
        if (currentSquare.hasBeenChecked) {
            return currentSquare.hasMine ? "B" : currentSquare.minesNearby;
        }
        if (!currentSquare.hasBeenChecked) {
            return currentSquare.flagged ? "F" : "";
        }
    }

    render() {
        return (
                <button
                    className={"square" + " " + this.props.square.hasBeenChecked}
                    onClick={this.handleClick}
                    onContextMenu={this.handleContextMenu}
                >{this.displaySquare()}</button>       
        );
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.id;
    let minefield = state.settings.minefield;
    let square = minefield[id];
    return {
        square
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(gameActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Square);