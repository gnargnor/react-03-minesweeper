import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as gameSettings from '../settings';
import Minefield from './minefield';
import * as gameActions from '../actions/gameActions';
import '../styles/game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <div className="game">
        <div className="title">
          <h1>Minesweeper</h1>
          <p>Difficulty: {this.props.settings.difficulty}</p>
          <span>Mega Bomberman's Little Brother</span><br />
        </div>
        <div className="difficulty">
          <span className="level">
            <input type="radio" checked={this.props.settings.difficulty === 'easy'} value="easy" onChange={this.props.actions.handleDifficultyChange}/>
                Easy
          </span>
          <span className="level">
            <input type="radio" checked={this.props.settings.difficulty === 'medium'} value="medium" onChange={this.props.actions.handleDifficultyChange}/>
                Medium
          </span>
          <span className="level">
            <input type="radio" checked={this.props.settings.difficulty === 'hard'} value="hard" onChange={this.props.actions.handleDifficultyChange}/>
                Hard 
          </span>
        </div>      
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

/** <div className="minefield">
  <Minefield rows={this.state.minefield} />
</div>        */




