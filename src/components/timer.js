import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from '../actions/gameActions';
import '../styles/timer.css';

class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.startTimer = this.startTimer.bind(this);
    this.getTimer = this.getTimer.bind(this);
  }

  startTimer(){
    console.log('click');
    return this.props.actions.startTimer();
  }

  getTimer(){
    console.log
    function getCurrentTimer(){ return this.props.timer }
    let timer = setInterval(
      getCurrentTimer()
      , 1000
    );
    return timer();
  }

  render() {
    return (
      <div className="timer-background" onClick={this.startTimer}>

          {this.getTimer}

      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  let timer = state.settings.timer;
  console.log(timer);
  return {
    timer
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
