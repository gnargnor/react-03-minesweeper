import React from 'react';
import { connect } from 'react-redux';
import {
  startGame,
  stopGame
} from '../reducers/gameReducers';
import '../styles/timer.css';

class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      elapsed: 0
    };
    this.startTimer = this.startTimer.bind(this);
    this.tick = this.tick.bind(this);
  }

  startTimer () {
    this.props.startGame();
    this.timer = setInterval(this.tick, 50);
  }

  stopTimer () {
    this.props.stopGame();
    clearInterval(this.timer);
  }

  tick () {
    let {start} = this.props;
    this.setState({elapsed: new Date() - start});
  }

  render() {
    let elapsed = Math.floor(this.state.elapsed / 1000).toFixed(0);
    return (
      <div 
        className="timer-background"
        onClick={!this.props.gameInProgress 
          ? () => this.startTimer() 
          : () => this.stopTimer()}>
        {this.props.gameOver ? this.props.finalTime : elapsed}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  let {start, gameInProgress, gameOver, finalTime} = state.settings;
  return {
    start,
    gameInProgress,
    gameOver,
    finalTime
  };
}

const mapDispatchToProps = {startGame, stopGame};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
