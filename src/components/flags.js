import React from 'react';
import { connect } from 'react-redux';
import '../styles/flags.css';

class Flags extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="flags-background">
          {this.props.totalMines - this.props.flagsPlaced}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  let flagsPlaced = state.settings.flagsPlaced;
  let totalMines = state.settings.mines;
  return {
    flagsPlaced,
    totalMines
  }
}

const mapDispatchToProps = {};


export default connect(mapStateToProps, mapDispatchToProps)(Flags);
