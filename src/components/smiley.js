import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  handleSmileyClick
} from '../reducers/gameReducers';
import '../styles/smiley.css';

class Smiley extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="smiley-background">
        <div 
          className="smiley-button"
          onClick={this.props.handleSmileyClick}>😀</div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

const mapDispatchToProps = {
  handleSmileyClick
};

export default connect(mapStateToProps, mapDispatchToProps)(Smiley);