import React from 'react';
import { connect } from 'react-redux';
import '../styles/timer.css';

class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time: 0
    };
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer () {
    let tick = this.setState({time: time + 1})
    return setTimeout(tick, 1000);
  }

  render() {
    return (
      <div className="timer-background" onClick={!this.props.gameInProgress ? this.startTimer : this.stopTimer}>
          {this.state.time}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
