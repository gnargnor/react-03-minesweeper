import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './header.js';
import Menu from './menu';
import Flags from './flags';
import Timer from './timer';
import Smiley from './smiley';
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
        <Header title="Minesweeper"/>
        <Menu />
        <div className="board">
          <div className="status">
            <Flags />
            <Smiley />
            <Timer />
            
          </div>
            <Minefield />
        </div>      
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  let gameInProgress = state.settings.gameInProgress;
  return {
    gameInProgress
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);






