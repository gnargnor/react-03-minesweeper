import React from 'react';
import { connect } from 'react-redux';
import '../styles/timer.css';

class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      start: new Date(),
      elapsed: 0,
      gameInProgress: false
    };
    this.startTimer = this.startTimer.bind(this);
    this.tick = this.tick.bind(this);
  }

  startTimer () {
      this.timer = setInterval(this.tick, 50);
      this.setState({start: new Date, gameInProgress: true});
  }

  stopTimer (time) {
    this.setState({gameInProgress: false});
    clearInterval(this.timer);
  }

  tick () {
    let {start} = this.state;
    this.setState({elapsed: new Date() - start});
  }

  render() {
    let elapsed = Math.floor(this.state.elapsed / 100);
    let seconds = (elapsed / 10).toFixed(0);
    return (
      <div 
        className="timer-background"
        onClick={!this.state.gameInProgress 
          ? () => this.startTimer() 
          : () => this.stopTimer(seconds)}
      >
          {seconds}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  let {start, elapsed, gameInProgress} = state.settings;
  return {
    start,
    elapsed,
    gameInProgress
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
