import React from 'react';
import Minefield from './minefield';
import '../styles/minesweeper.css';

export default class Minesweeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widthX: 10,
      lengthY: 10,
      numberOfMines: 10,
      flags: 10,
      timer: 0,
      minefield: Array(10).fill(Array(10).fill({
        hasMine: false,
        nearbyMines: 0,
        hasBeenSwept: false
      })),
    };
  }
  

  plantMines(numberOfMines){
    for(let i = 0; i < numberOfMines; i++){
      let XY = randomSquare(this.state.widthX, this.state.lengthY);
      console.log('xy: ', XY[0], XY[1]);
      this.state.minefield[XY[0]][XY[1]].hasMine = true;
      console.log(this.state.minefield[XY[0]][XY[1]]);
    }
  }

  render() {
    this.plantMines(this.state.numberOfMines);
    return (
      <div className="minesweeper">
        <div className="title">
          <h1>Minesweeper</h1>
          <span>Mega Bomberman's Little Brotherman</span><br />
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
  console.log('X', xValue);
  console.log('Y', yValue);
  let XY = [xValue, yValue];
  return XY;
}

