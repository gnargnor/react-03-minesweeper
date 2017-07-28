// import Matrix from 'node-matrix';

// const MinefieldSetup = (xWidth, yHeight, numberOfMines) => {

//   this.createMinefield = function(xWidth, yHeight) {
//     this.minefield = new Matrix(Array(10).fill(Array(10).fill(null)));
//   }.bind(this);

//   this.xWidth = xWidth;
//   this.yHeight = yHeight;
//   this.createMinefield(xWidth, yHeight);

//   console.log(this.minefield);


// }

// export default MinefieldSetup;


// markSquares(){
//     let minefieldCopy = this.state.minefield.splice(0);
//     console.log(minefieldCopy);
//     console.log(this.state.minefield);
//     for (let i = 0; i < minefieldCopy.length; i++) {
//       for (let j = 0; j < minefieldCopy[i].length; j++) {
//         minefieldCopy[i][j].xValue = j;
//         minefieldCopy[i][j].yValue = i;
//         console.log(minefieldCopy[i][j]);
//         this.setState({minefield: minefieldCopy});
//       }
//     }
//     console.log(this.state.minefield);
//   }

  
  

  // plantMines(numberOfMines){
  //   let mineLocations = new Set;
  //   while (mineLocations.size < numberOfMines) {
  //     let XY = randomSquare(this.state.widthX, this.state.lengthY);
  //     // console.log(XY);
  //     let currentSquare = this.state.minefield[XY[0]][XY[1]];
  //     // console.log('current square state:', currentSquare);
  //     mineLocations.add(XY);
  //     // console.log(`mine location set ${mineLocations.entries}`);
  //   }
  // }