import 'babel-polyfill';
import * as settings from '../settings/settings';
import * as types from '../actions/actionTypes';

const initialSettings = Object.assign(
  {},
  settings.easy,
  {
    minefield: prepareGame(settings.easy),
    gameDropdown: false,
    helpDropdown: false,
    time: 0,
    endTime: 0,
    gameInProgress: false,
    gameOver:false,
    flagsPlaced: 0
  }
);

const gameReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case types.HANDLE_DIFFICULTY_CHANGE:
      return Object.assign(
        {},
        initialSettings,
        configureDifficulty(undefined, action),
        { gameDropdown: !action.gameDropdown }       
      );
    case types.HANDLE_MINEFIELD_CLICK:
      return Object.assign(
        {},
        state,
        handleClickedSquare(state, action)
      );
    case types.HANDLE_MINEFIELD_RIGHT_CLICK:
      return Object.assign(
        {},
        state,
        handleRightClick(state, action)
      );
    case types.HANDLE_GAME_CLICK:
      return Object.assign(
        {},
        state,
        { gameDropdown: !action.gameDropdown, helpDropdown: false }
      );
    case types.HANDLE_HELP_CLICK:
      return Object.assign(
        {},
        state,
        { helpDropdown: !action.helpDropdown, gameDropdown: false }
      );
    case types.HANDLE_SMILEY_CLICK:
      return Object.assign(
        {},
        state,
        configureDifficulty(undefined, state)
      );
    default:
      return state;
  }
};

function configureDifficulty (state, action) {
    var gameSettings;
    switch (action.difficulty) {
        case 'easy':
            gameSettings = settings.easy;
            return Object.assign(
                {},
                gameSettings,
                {minefield: prepareGame(gameSettings)}
            );
        case 'medium':
            gameSettings = settings.medium;
            return Object.assign(
                {},
                gameSettings, 
                {minefield: prepareGame(gameSettings)}
            );
        case 'hard':
            gameSettings = settings.hard;
            return Object.assign(
                {},
                gameSettings,
                {minefield: prepareGame(gameSettings)}
            );
        default:
            return state;
    }
}

function checkNearby (minefield, rows, columns) {
    let currentSquare;
    const validateSquare = (clickedSquare, direction) => {
        try {
            switch(direction){
                case 'north':
                    currentSquare = minefield[(clickedSquare.row - 1 > -1)?clickedSquare.row - 1:undefined][clickedSquare.column];
                    return currentSquare.hasMine?1:0;
                case 'northeast':
                    currentSquare = minefield[(clickedSquare.row - 1 > -1)?clickedSquare.row - 1:undefined][(clickedSquare.column + 1 !== columns)?clickedSquare.column + 1:undefined];
                    return currentSquare.hasMine?1:0;
                case 'east':
                    currentSquare = minefield[(clickedSquare.row)][(clickedSquare.column + 1 !== columns)?clickedSquare.column + 1:undefined];
                    return currentSquare.hasMine?1:0;
                case 'southeast':
                    currentSquare = minefield[(clickedSquare.row + 1 !== rows)?clickedSquare.row + 1:undefined][(clickedSquare.column + 1 !== columns)?clickedSquare.column + 1:undefined];
                    return currentSquare.hasMine?1:0;
                case 'south':
                    currentSquare = minefield[(clickedSquare.row + 1 !== rows)?clickedSquare.row + 1:undefined][clickedSquare.column];
                    return currentSquare.hasMine?1:0;
                case 'southwest':
                    currentSquare = minefield[(clickedSquare.row + 1 !== rows)?clickedSquare.row + 1:undefined][(clickedSquare.column - 1 > -1)?clickedSquare.column - 1:undefined];
                    return currentSquare.hasMine?1:0;
                case 'west':
                    currentSquare = minefield[(clickedSquare.row)][(clickedSquare.column - 1 > -1)?clickedSquare.column - 1:undefined];
                    return currentSquare.hasMine?1:0;
                case 'northwest':
                    currentSquare =  minefield[(clickedSquare.row - 1 > -1)?clickedSquare.row - 1:undefined][(clickedSquare.column - 1 > -1)?clickedSquare.column - 1:undefined];
                    return currentSquare.hasMine?1:0;
            }
        } catch(e){
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
                {minesNearby: minesNearby.reduce((a,b) => a + b)}
            );
        });
    }); 
};

function prepareGame (gameSettings) {
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
    let minefieldMap = checkNearby( minefield, rows, columns);
    let squares = minefieldMap.reduce((a, b) => a.concat(b));
    console.log(minefieldMap);
    return squares;
};



function handleClickedSquare (state, action) {
    let clickedSquare = Object.assign({}, action.clickedSquare);
    let minefield = [...state.minefield];
    let gameInProgress = state.gameInProgress;
    let gameOver = state.gameOver;
    if (!gameInProgress){
        gameInProgress = true;
    }
    if (clickedSquare.hasBeenChecked  || clickedSquare === undefined) {
        return;
    }
    clickedSquare.hasBeenChecked = true;
    if (!clickedSquare.hasMine) {
        return Object.assign(
        {},
        state,
        {minefield: [
            ...minefield.slice(0, clickedSquare.id),
            clickedSquare,
            ...minefield.slice(clickedSquare.id + 1)
        ],
        gameInProgress}
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

function handleRightClick (state, action) {
    let rightClickedSquare = Object.assign({}, action.rightClickedSquare);
    let minefield = [...state.minefield];
    let flagsPlaced = state.flagsPlaced;
    let totalMines = state.mines;
    if (rightClickedSquare.hasBeenClicked || flagsPlaced === totalMines) {
        return;
    }
    rightClickedSquare.flagged = !rightClickedSquare.flagged;
    flagsPlaced += 1;
     return Object.assign(
        {},
        state,
        { minefield: [
            ...minefield.slice(0, rightClickedSquare.id),
            rightClickedSquare,
            ...minefield.slice(rightClickedSquare.id + 1)
        ],
        flagsPlaced
        }
    );
}

export default gameReducer;