import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as menuActions from '../actions/menuActions';
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

  handleHelpClick(e){
    this.props.actions.handleHelpClick(this.props.helpDropdown);
  }

  render(){
    return(
      <div className="menu-nav">
        <div className="menu">
          <div className="menu-item-select game" onClick={() => this.props.actions.handleGameClick(this.props.gameDropdown)}><span className="underline">G</span>ame</div>
          <div className={"game-dropdown-item" + " " + this.props.gameDropdown}>
            <div className="game-dropdown">
              <p>Easy</p>
              <p>Medium</p>
              <p>Hard</p>
            </div>
          </div>

          <div className="menu-item-select help" onClick={() => this.props.actions.handleHelpClick(this.props.helpDropdown)}><span className="underline">H</span>elp</div>
          <div className={"help-dropdown-item" + " " + this.props.helpDropdown}>
            <div className="help-dropdown">
              <p>Created by Logan Kelly</p>
              <p>Repository</p>
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
        actions: bindActionCreators(menuActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
// export default Menu;