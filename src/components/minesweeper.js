import React from 'react';
import Minefield from './minefield';
import MinefieldSetup from '../models/minefieldSetup.js';
import '../styles/minesweeper.css';

export default class Minesweeper extends React.Component {
  constructor(props) {
    let shit = {
      hasMine: false,
      hasBeenSwept: false,
      nearbyMines: 0,
      x: 0,
      y: 0
    };
    let minefield = [[shit, shit, shit, shit, shit, shit, shit, shit, shit, shit],
                    [shit, shit, shit, shit, shit, shit, shit, shit, shit, shit],
                    [shit, shit, shit, shit, shit, shit, shit, shit, shit, shit],
                    [shit, shit, shit, shit, shit, shit, shit, shit, shit, shit],
                    [shit, shit, shit, shit, shit, shit, shit, shit, shit, shit],
                    [shit, shit, shit, shit, shit, shit, shit, shit, shit, shit],
                    [shit, shit, shit, shit, shit, shit, shit, shit, shit, shit],
                    [shit, shit, shit, shit, shit, shit, shit, shit, shit, shit],
                    [shit, shit, shit, shit, shit, shit, shit, shit, shit, shit],
                    [shit, shit, shit, shit, shit, shit, shit, shit, shit, shit],
                    ];
    for (let i=0; i<minefield.length; i++){
      for (let j=0; j<minefield[i].length; j++){
        let currentSquare = minefield[i][j];
        currentSquare.hasMine = false;
        currentSquare.hasBeenSwept = false;
        currentSquare.nearbyMines = 0;
        currentSquare.x = j;
        currentSquare.y = i;
        console.log (currentSquare);
      }
    }
    console.log(minefield);
    super(props);
    this.state = {
      counter: 0,
      widthX: 10,
      lengthY: 10,
      numberOfMines: 10,
      flags: 10,
      timer: 0,
      minefield: minefield,
    };
  }
  
  render() {
    console.log(this.state.minefield[0][5]);
    return (
      <div className="minesweeper">
        <div className="title">
          <h1>Minesweeper</h1>
          <span>Mega Bomberman's Little Brother</span><br />
        </div>
        <div className="minefield">
          <Minefield rows={this.state.minefield}/>
        </div>       
      </div>
    );
  }
};

let randomSquare = (X, Y) => {
  let xValue = Math.floor(Math.random() * X);
  let yValue = Math.floor(Math.random() * Y);
  let XY = [xValue, yValue];
  return XY;
}




