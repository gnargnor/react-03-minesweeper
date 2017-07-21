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
    let mineLocations = new Set;
    while (mineLocations.size < 10) {
      let XY = randomSquare(this.state.widthX, this.state.lengthY);
      console.log(this.state.minefield[XY[0]][XY[1]].hasMine);
      this.state.minefield[XY[0]][XY[1]].hasMine = true;
      mineLocations.add(XY);
      console.log(mineLocations);
    }
  }
  

  render() {
    this.plantMines(this.state.numberOfMines);
    console.log(this.state.minefield[4][7].hasMine, this.state.minefield[4][8].hasMine);
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



