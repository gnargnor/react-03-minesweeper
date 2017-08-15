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
        console.log(this.props.square);
        return this.props.actions.handleMinefieldClick(clickedSquare);
    }

    displayOnceClicked(currentSquare){
        let display = "";
        if (currentSquare.hasBeenChecked){
            return display = currentSquare.minesNearby;
        }
        return display;
    }

    render() {
        return (
                <button
                    className={"square" + " " + this.props.square.hasBeenChecked}
                    onClick={() => this.handleClick(this.props.square)}
                >{this.props.square.minesNearby}</button>       
        );
    }
}

function mapStateToProps(state, ownProps) {
    let row = ownProps.square.row;
    let column = ownProps.square.column;
    let minefield = state.settings.minefield;
    let square = minefield[row][column];
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

// {this.props.minefield[this.props.square.row][this.props.square.column].hasBeenClicked?this.props.minefield[this.props.square.row][this.props.square.column].minesNearby:""}