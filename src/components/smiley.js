import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as gameActions from '../actions/gameActions';
import '../styles/smiley.css';

class Smiley extends React.Component {
  constructor(props){
  super(props);
  this.handleSmileyClick = this.handleSmileyClick.bind(this);
}

  handleSmileyClick() {
    return this.props.actions.handleSmileyClick();
  }

  render() {
    return (
      <div className="smiley-background">
        <div 
          className="smiley-button"
          onClick={this.handleSmileyClick}>😀</div>
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Smiley);