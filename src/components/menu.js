import React from 'react';
import { connect } from 'react-redux';
import {
  handleGameClick,
  handleHelpClick
} from '../reducers/menuReducers';
import '../styles/menuItems.css';

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){
    return(
      <div className="menu-nav">
        <div className="menu">

          <div className="menu-item">
            <div className="menu-item-select" onClick={() => this.props.handleGameClick(this.props.gameDropdown)}><span className="underline">G</span>ame</div>
            <div className={"game-dropdown-item" + " " + this.props.gameDropdown}>
              <div className="menu-dropdown">
                <p className="menu-option" value="easy" onClick={() => this.props.handleDifficultyChange({difficulty: "easy", gameDropdown: this.props.gameDropdown})}>Beginner</p>
                <p className="menu-option" value="medium" onClick={() => this.props.handleDifficultyChange({difficulty: "medium", gameDropdown: this.props.gameDropdown})}>Intermediate</p>
                <p className="menu-option" value="difficult" onClick={() => this.props.handleDifficultyChange({difficulty: "hard", gameDropdown: this.props.gameDropdown})}>Expert</p>
              </div>
            </div>
          </div>
          <div className="menu-item">
            <div className="menu-item-select" onClick={() => this.props.handleHelpClick(this.props.helpDropdown)}><span className="underline">H</span>elp</div>
            <div className={"help-dropdown-item" + " " + this.props.helpDropdown}>
              <div className="menu-dropdown">
                <p className="menu-option">Created by Logan Kelly</p>
                <p className="menu-option"><a href="https://www.github.com/gnargnor/react-03-minesweeper">Repository</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state.settings.gameDropdown);
    return {
        gameDropdown: state.settings.gameDropdown,
        helpDropdown: state.settings.helpDropdown
    };
}

const mapDispatchToProps = {
  handleGameClick,
  handleHelpClick
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
