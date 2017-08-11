import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as gameActions from '../actions/gameActions';
import '../styles/menuItems.css';

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  handleGameClick(){
    this.props.actions.handleGameClick(this.props.gameDropdown);
  }

  handleHelpClick(){
    this.props.actions.handleHelpClick(this.props.helpDropdown);
  }

  render(){
    return(
      <div className="menu-nav">
        <div className="menu">

          <div className="menu-item">
            <div className="menu-item-select" onClick={() => this.props.actions.handleGameClick(this.props.gameDropdown)}><span className="underline">G</span>ame</div>
            <div className={"game-dropdown-item" + " " + this.props.gameDropdown}>
              <div className="menu-dropdown">
                <p className="menu-option" value="easy" onClick={() => this.props.actions.handleDifficultyChange("easy")}>Beginner</p>
                <p className="menu-option" value="medium" onClick={() => this.props.actions.handleDifficultyChange("medium")}>Intermediate</p>
                <p className="menu-option" value="difficult" onClick={() => this.props.actions.handleDifficultyChange("hard")}>Expert</p>
              </div>
            </div>
          </div>
          <div className="menu-item">
            <div className="menu-item-select" onClick={() => this.props.actions.handleHelpClick(this.props.helpDropdown)}><span className="underline">H</span>elp</div>
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
    return {
        gameDropdown: state.menu.gameDropdown,
        helpDropdown: state.menu.helpDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(gameActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
// export default Menu;