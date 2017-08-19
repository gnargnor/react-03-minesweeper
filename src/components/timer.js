import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from '../actions/gameActions';
import '../styles/timer.css';

class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className="timer-background" onClick={!this.props.gameInProgress ? this.startTimer : this.stopTimer}>
          {this.props.time}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  let time = state.settings.time;
  let gameInProgress = state.settings.gameInProgress;
  return {
    time,
    gameInProgress,
  };
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
