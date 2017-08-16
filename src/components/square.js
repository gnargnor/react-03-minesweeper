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
    }

    handleClick(e){
        return this.props.actions.handleMinefieldClick(this.props.square);
    }

    handleContextMenu(e){
        console.log(this.props);
        e.preventDefault();
        return this.props.actions.handleMinefieldRightClick(this.props.square);
    }

    render() {
        return (
                <button
                    className={"square" + " " + this.props.square.hasBeenChecked}
                    onClick={this.handleClick}
                    onContextMenu={this.handleContextMenu}
                >{this.props.square.hasBeenChecked?this.props.square.minesNearby:""}</button>       
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

// {this.props.minefield[this.props.square.row][this.props.square.column].hasBeenClicked?this.props.minefield[this.props.square.row][this.props.square.column].minesNearby:""}