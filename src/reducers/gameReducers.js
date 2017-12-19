import 'babel-polyfill';
import * as settings from '../settings/settings';


const initialSettings = Object.assign(
  {},
  settings.easy,
  {
    minefield: prepareGame(settings.easy),
    gameDropdown: false,
    helpDropdown: false,
    gameInProgress: false,
    start: 0,
    finalTime: 0,
    gameOver: false,
    flagsPlaced: 0
  }
);

const gameReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case HANDLE_MINEFIELD_CLICK:
      return Object.assign(
        {},
        state,
        handleClickedSquare(state, action)
      );
    case HANDLE_MINEFIELD_RIGHT_CLICK:
      return Object.assign(
        {},
        state,
        handleRightClick(state, action)
      );
    case HANDLE_SMILEY_CLICK:
      return Object.assign(
        {},
        state,
        configureDifficulty(undefined, state),
        {gameInProgress: false, gameOver: false}
      );
    case HANDLE_DIFFICULTY_CHANGE:
      return Object.assign(
        {},
        initialSettings,
        configureDifficulty(undefined, action),
        { gameDropdown: false }
      );
    case HANDLE_GAME_CLICK:
      return Object.assign(
        {},
        state,
        {gameDropdown: !state.gameDropdown}
      );
    case HANDLE_HELP_CLICK:
      return Object.assign(
        {},
        state,
        {helpDropdown: !state.helpDropdown}
      );
    case START_GAME:
      return Object.assign(
        {},
        state,
        {gameInProgress: true, gameOver: false, start: new Date()},
      );
    case STOP_GAME:
      return Object.assign(
        {},
        state,
        {gameInProgress: false, gameOver: true, finalTime: (Math.round(new Date() - state.start) / 1000).toFixed(0)}
      )
    default:
      return state;
  }
};

export default gameReducer;

// Actions
const HANDLE_MINEFIELD_CLICK = 'HANDLE_MINEFIELD_CLICK';
const HANDLE_MINEFIELD_RIGHT_CLICK = 'HANDLE_MINEFIELD_RIGHT_CLICK';
const HANDLE_SMILEY_CLICK = 'HANDLE_SMILEY_CLICK';
const HANDLE_DIFFICULTY_CHANGE = 'HANDLE_DIFFICULTY_CHANGE';
const HANDLE_GAME_CLICK = 'HANDLE_GAME_CLICK';
const HANDLE_HELP_CLICK = 'HANDLE_HELP_CLICK';
const START_GAME = 'START_GAME';
const STOP_GAME = 'STOP_GAME';

export const handleMinefieldClick = (clickedSquare) => {
  return { type: HANDLE_MINEFIELD_CLICK, clickedSquare };
}

export const handleMinefieldRightClick = (rightClickedSquare) => {
  return { type: HANDLE_MINEFIELD_RIGHT_CLICK, rightClickedSquare }
}

export const handleSmileyClick = () => {
  return {type: HANDLE_SMILEY_CLICK };
}

export const handleDifficultyChange = (gameObject) => {
  let difficulty = gameObject.difficulty;
  let gameDropdown = gameObject.gameDropdown;
  return { type: HANDLE_DIFFICULTY_CHANGE, difficulty, gameDropdown };
}

export const handleGameClick = () => {
  return {type: HANDLE_GAME_CLICK};
}

export const handleHelpClick = () => {
  return {type: HANDLE_HELP_CLICK};
}

export const startGame = () => {
  return {type: START_GAME}
}

export const stopGame = () => {
  return {type: STOP_GAME}
}

// Game Logic
function tick () {

}

function configureDifficulty(state, action) {
  switch (action.difficulty) {
    case 'easy':
      return Object.assign(
        {},
        settings.easy,
        { minefield: prepareGame(settings.easy) }
      );
    case 'medium':
      return Object.assign(
        {},
        settings.medium,
        { minefield: prepareGame(settings.medium) }
      );
    case 'hard':
      return Object.assign(
        {},
        settings.hard,
        { minefield: prepareGame(settings.hard) }
      );
    default:
      return state;
  }
}

function prepareGame(gameSettings) {
  let { rows, columns, mines } = gameSettings;
  let gameRows = Array(rows).fill(null);
  let minefield = gameRows.map((row, index) => {
    let squares = Array(columns).fill({
      row: index,
      column: 0,
      id: 0,
      hasMine: false,
      hasBeenChecked: false,
      flagged: false,
      minesNearby: 0
    });
    let thisRow = squares.map((square, index) => {
      return Object.assign(
        {},
        square,
        {
          column: index,
          id: index + (square.row * columns)
        }
      );
    });
    return thisRow;
  });
  let minesPlaced = 0;
  let limit = mines;
  for (let minesPlaced = 0; minesPlaced < limit; minesPlaced++) {
    let currentLocation = minefield[Math.floor(Math.random() * rows)][Math.floor(Math.random() * columns)];
    if (currentLocation.hasMine) {
      minesPlaced--;
    }
    currentLocation.hasMine = true;
  }
  let minefieldMap = checkNearby(minefield, rows, columns);
  let squares = minefieldMap.reduce((a, b) => a.concat(b));
  return squares;
}

function handleClickedSquare(state, action) {
  let clickedSquare = Object.assign({}, action.clickedSquare);
  console.log(clickedSquare);
  console.log(state.rows, state.columns, state.mines);
  let minefield = [...state.minefield];
  let gameInProgress = state.gameInProgress;
  let gameOver = state.gameOver;
  if (!gameInProgress) {
    gameInProgress = true;
  }
  if (clickedSquare.hasBeenChecked || clickedSquare === undefined) {
    return;
  }
  clickedSquare.hasBeenChecked = true;
  if (!clickedSquare.hasMine) {
    return Object.assign(
      {},
      state,
      {
        minefield: [
          ...minefield.slice(0, clickedSquare.id),
          clickedSquare,
          ...minefield.slice(clickedSquare.id + 1)
        ],
        gameInProgress
      }
    );
    // } else {
    //     // gameOver = true;
    //     // gameInProgress = false;
    //     return Object.assign(
    //     {},
    //     state,
    //     {minefield: [
    //         ...minefield.slice(0, clickedSquare.id),
    //         clickedSquare,
    //         ...minefield.slice(clickedSquare.id + 1)
    //     ],
    //     gameInProgress : false,
    //     gameOver: true}
    //     );
  }
}

function handleSquareClick (state, action) {
  const {
    id,
    row, 
    column,
    flagged,
    hasBeenChecked,
    hasMine,
    minesNearby
  } = action.clickedSquare; // our square
  const minefield = [...state.minefield];
  const gameInProgress = state.gameInProgress;
  const gameOver = state.gameOver; // our state
  /**
   * @todo rewrite logic for checking the squares to work recursively
   */

  // is the game already in progress? start the timer
  if (!gameInProgress) {

  }
  // is the game already over? square been clicked? flagged?
  if (gameOver || hasBeenChecked || flagged) {
    return;
  }

  // does the square have a bomb?
  if (hasMine) {
    return endGame(state, action);
  }
  // how many squares nearby have bombs?
  let mines = countNearby(state, action);
  // if there are no bombs, open nearby squares
  if (!mines) {
    return scanNearby(state, action);
  }
  return renderSquare(state, action);
}

// p = possibility, e = eligible, r = rowClicked, c = columnClicked
function countNearby (state, action) {
  const {row: r, column: c} = action.clickedSquare;
  const {rows: numRows, columns: numColumns, minefield} = state;
  const plusOne = num => num + 1;
  const minusOne = num => num -1;
  const returnNum = num => num;
  // array of possible adjacent squares
  const ps = [
    [plusOne, plusOne],
    [plusOne, returnNum],
    [plusOne, minusOne],
    [returnNum, plusOne],
    [returnNum, minusOne],
    [minusOne, plusOne],
    [minusOne, returnNum],
    [minusOne, plusOne]
  ];
  return ps.filter(p => {
    // filter out ineligible positions
    let xFunc = p[0], yFunc = p[1];
    return (0 <= xFunc(c) < numCols && 0 <= yFunc(r) < numRows);
  }).map(e => {
    // get coordinates of eligible squares
    let xFunc = e[0], yFunc = e[1];
    return {x: xFunc(c), y: yFunc(r)};
  }).reduce(mines, coords => {
    // return number of squares nearby with mines
    let {x, y} = coords;
    return mines + minefield[x][y].hasMine ? 1 : 0;
  }, 0);
}

// returns a map of the eligible nearby squares nearby mine count
function scanNearby (state, action) {
  const {row: r, column: c} = action.clickedSquare;
  const {rows: numRows, columns: numColumns, minefield} = state;
  const plusOne = num => num + 1;
  const minusOne = num => num -1;
  const returnNum = num => num;
  // array of possible adjacent squares
  const ps = [
    [plusOne, plusOne],
    [plusOne, returnNum],
    [plusOne, minusOne],
    [returnNum, plusOne],
    [returnNum, minusOne],
    [minusOne, plusOne],
    [minusOne, returnNum],
    [minusOne, plusOne]
  ];
  let scans = ps.filter(p => {
    // filter out ineligible positions
    let xFunc = p[0], yFunc = p[1];
    return (0 <= xFunc(c) < numCols && 0 <= yFunc(r) < numRows);
  }).map(e => {
    // get coordinates of eligible squares
    let xFunc = e[0], yFunc = e[1];
    return {x: xFunc(c), y: yFunc(r)};
  }).map(coords => {
    // open the eligible squares
    let {x, y} = coords;
    minefield[x][y].hasBeenChecked = true;
    let recursedSquare = {
      row: y,
      column: x
    };
    minefield[x][y].minesNearby = countNearby(state, recursedSquare);
    if (!minefield[x][y].minesNearby) {
      scanNearby(state, recursedSquare);
    }
  });
  return Promise.all(scans);
}



function checkNearby(minefield, rows, columns) {
  let currentSquare;
  const validateSquare = (clickedSquare, direction) => {
    try {
      switch (direction) {
        case 'north':
          currentSquare = minefield[(clickedSquare.row - 1 > -1) ? clickedSquare.row - 1 : undefined][clickedSquare.column];
          return currentSquare.hasMine ? 1 : 0;
        case 'northeast':
          currentSquare = minefield[(clickedSquare.row - 1 > -1) ? clickedSquare.row - 1 : undefined][(clickedSquare.column + 1 !== columns) ? clickedSquare.column + 1 : undefined];
          return currentSquare.hasMine ? 1 : 0;
        case 'east':
          currentSquare = minefield[(clickedSquare.row)][(clickedSquare.column + 1 !== columns) ? clickedSquare.column + 1 : undefined];
          return currentSquare.hasMine ? 1 : 0;
        case 'southeast':
          currentSquare = minefield[(clickedSquare.row + 1 !== rows) ? clickedSquare.row + 1 : undefined][(clickedSquare.column + 1 !== columns) ? clickedSquare.column + 1 : undefined];
          return currentSquare.hasMine ? 1 : 0;
        case 'south':
          currentSquare = minefield[(clickedSquare.row + 1 !== rows) ? clickedSquare.row + 1 : undefined][clickedSquare.column];
          return currentSquare.hasMine ? 1 : 0;
        case 'southwest':
          currentSquare = minefield[(clickedSquare.row + 1 !== rows) ? clickedSquare.row + 1 : undefined][(clickedSquare.column - 1 > -1) ? clickedSquare.column - 1 : undefined];
          return currentSquare.hasMine ? 1 : 0;
        case 'west':
          currentSquare = minefield[(clickedSquare.row)][(clickedSquare.column - 1 > -1) ? clickedSquare.column - 1 : undefined];
          return currentSquare.hasMine ? 1 : 0;
        case 'northwest':
          currentSquare = minefield[(clickedSquare.row - 1 > -1) ? clickedSquare.row - 1 : undefined][(clickedSquare.column - 1 > -1) ? clickedSquare.column - 1 : undefined];
          return currentSquare.hasMine ? 1 : 0;
      }
    } catch (e) {
      return 0;
    }
  };

  return minefield.map(row => {
    return row.map(square => {
      const nearbySquares = {
        n: validateSquare(square, 'north'),
        ne: validateSquare(square, 'northeast'),
        e: validateSquare(square, 'east'),
        se: validateSquare(square, 'southeast'),
        s: validateSquare(square, 'south'),
        sw: validateSquare(square, 'southwest'),
        w: validateSquare(square, 'west'),
        nw: validateSquare(square, 'northwest'),
      };
      let minesNearby = Object.values(nearbySquares);
      return Object.assign(
        {},
        square,
        { minesNearby: minesNearby.reduce((a, b) => a + b) }
      );
    });
  });
}

function handleRightClick(state, action) {
  let rightClickedSquare = Object.assign({}, action.rightClickedSquare);
  let minefield = [...state.minefield];
  let flagsPlaced = state.flagsPlaced;
  let totalMines = state.mines;
  if (rightClickedSquare.hasBeenClicked || flagsPlaced === totalMines) {
    return;
  }
  flagsPlaced = rightClickedSquare.flagged ? flagsPlaced - 1 : flagsPlaced + 1;
  rightClickedSquare.flagged = !rightClickedSquare.flagged;
  return Object.assign(
    {},
    state,
    {
      minefield: [
        ...minefield.slice(0, rightClickedSquare.id),
        rightClickedSquare,
        ...minefield.slice(rightClickedSquare.id + 1)
      ],
      flagsPlaced
    }
  );
}

