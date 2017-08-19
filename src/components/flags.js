import React from 'react';
import * as gameActions from '../actions/gameActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/flags.css';

class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="flags-background">

          {this.props.totalMines - this.props.flagsPlaced}

      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  let flagsPlaced = state.settings.flagsPlaced;
  let totalMines = state.settings.mines;
  return {
    flagsPlaced,
    totalMines
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(gameActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Timer);
