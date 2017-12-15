import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  handleMinefieldClick,
  handleMinefieldRightClick
} from '../reducers/gameReducers';
import '../styles/square.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.handleContextMenu= this.handleContextMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.displaySquare = this.displaySquare.bind(this);
    }

    handleClick(e){
        let currentSquare = this.props.square;
        if (currentSquare.flagged){
            return;
        }
        return this.props.handleMinefieldClick(this.props.square);
    }

    handleContextMenu(e){
        e.preventDefault();
        let currentSquare = this.props.square;
        if (currentSquare.hasBeenChecked){
            return;
        }
        return this.props.handleMinefieldRightClick(this.props.square);
    }

    displaySquare() {
        let currentSquare = this.props.square;
        let gameOver = this.props.gameOver;
        if (currentSquare.hasBeenChecked) {
            return currentSquare.hasMine ? "💣" : currentSquare.minesNearby;
        }
        if (!currentSquare.hasBeenChecked && !gameOver) {
            return currentSquare.flagged ? "🚩" : "";
        }
        if (gameOver && !currentSquare.hasBeenChecked) {
            return currentSquare.hasMine ? "💣" : "";
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
    let gameOver = state.settings.gameOver;
    return {
        square
    };
}

const mapDispatchToProps = {
  handleMinefieldClick,
  handleMinefieldRightClick
};

export default connect(mapStateToProps, mapDispatchToProps)(Square);