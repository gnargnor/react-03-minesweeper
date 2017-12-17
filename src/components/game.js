import React from 'react';
import { connect } from 'react-redux';
import Header from './header.js';
import Menu from './menu';
import Flags from './flags';
import Timer from './timer';
import Smiley from './smiley';
import Minefield from './minefield';
import {
  handleMinefieldClick,
  handleMinefieldRightClick,
  handleSmileyClick,
  handleGameClick,
  handleHelpClick
} from '../reducers/gameReducers';
import '../styles/game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseUp (e) {
    let {handleGameClick, handleHelpClick, gameDropdown, helpDropdown} = this.props;
    let dropdownElements = [...document.querySelectorAll('.menu-tag')];
    if (gameDropdown && !dropdownElements.filter((item) => item === e.target).length) {
      return handleGameClick();
    }
    if(helpDropdown && !dropdownElements.filter((item) => item === e.target).length) {
      return handleHelpClick();
    }
  }

  render() {
    return (
      <div className="game" onMouseUp={this.handleMouseUp}>
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
  let {gameInProgress, gameDropdown, helpDropdown} = state.settings;
  return {
    gameInProgress,
    gameDropdown,
    helpDropdown
  };
}

const mapDispatchToProps = {
  handleMinefieldClick,
  handleMinefieldRightClick,
  handleSmileyClick,
  handleGameClick,
  handleHelpClick
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);






