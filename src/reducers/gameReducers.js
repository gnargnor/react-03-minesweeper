import 'babel-polyfill';
import * as settings from '../settings';
import * as types from '../actions/actionTypes';

const configureDifficulty = (state, action) => {
    console.log(action.difficulty);
    switch (action.difficulty) {
        case 'easy':
            return Object.assign(
                {},
                settings.easy,
                {minefield: prepareGame(settings.easy.rows, settings.easy.columns, settings.easy.mines)}
            );
        case 'medium':
            return Object.assign(
                {},
                settings.medium, 
                {minefield: prepareGame(settings.medium.rows, settings.medium.columns, settings.medium.mines)}
            );
        case 'hard':
            return Object.assign(
                {},
                settings.hard,
                {minefield: prepareGame(settings.hard.rows, settings.hard.columns, settings.hard.mines)}
            );
        default:
            return state;
    }
};

const checkNearby = (minefield, rows, columns) => {
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

const prepareGame = (numRows, numColumns, totalMines) => {
    let rows = Array(numRows).fill(null);
    let minefield = rows.map((row, index) => {
        let squares = Array(numColumns).fill({
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
                    id: index + (square.row * numColumns)
                }
            );
        });
        return thisRow;
    });
    let minesPlaced = 0;
    for (let minesPlaced = 0; minesPlaced < totalMines; minesPlaced++) {
        let currentLocation = minefield[Math.floor(Math.random() * numRows)][Math.floor(Math.random() * numColumns)];
        if (currentLocation.hasMine) {
            minesPlaced--;
        }
        currentLocation.hasMine = true;
    }
    let minefieldMap = checkNearby( minefield, numRows, numColumns);
    let squares = minefieldMap.reduce((a, b) => a.concat(b));
    return squares;
};

const initialSettings = Object.assign(
    {},
    settings.easy,
    {minefield: prepareGame(settings.easy.rows, settings.easy.columns, settings.easy.mines),
     gameDropdown: false,
     helpDropdown: false,
     time: 0,
     endTime: 0,
     gameInProgress: false,
     gameOver:false,
     flagsPlaced: 0
    }
);



const handleClickedSquare = (state, action) => {
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
    
};

const handleRightClick = (state, action) => {
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
};




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
        console.log(state, action);
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
                { gameDropdown: !action.gameDropdown } 
            );
        case types.HANDLE_HELP_CLICK:
            return Object.assign(
                {},
                state,
                { helpDropdown: !action.helpDropdown }
            );
        case types.HANDLE_SMILEY_CLICK:
        console.log('smileyyyy:', typeof state.difficulty);
            return Object.assign(
                {},
                state,
                configureDifficulty(undefined, state)
            );
        
        default:
            return state;
    }
};

export default gameReducer;