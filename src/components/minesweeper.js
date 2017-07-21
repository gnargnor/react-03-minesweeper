import React from 'react';
import Minefield from './minefield';
import '../styles/minesweeper.css';

export default class Minesweeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="minesweeper">
        <div className="title">
          <h1>Minesweeper</h1>
          <span>Mega Bomberman's Little Brotherman</span><br />
        </div>
        <div className="minefield">
          <Minefield />
        </div>       
      </div>
    );
  }
}

