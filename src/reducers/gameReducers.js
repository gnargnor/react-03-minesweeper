import 'babel-polyfill';
import * as settings from '../settings';
import * as types from '../actions/actionTypes';

const prepareGame = (numRows, numColumns, totalMines) => {
    let rows = Array(numRows).fill(null);
    let minefield = rows.map((row, index) => {
        let squares = Array(numColumns).fill({
            row: index,
            column: 0,
            id: 0,
            hasMine: false,
            hasBeenChecked: false,
            minesNearby: 0
        });
        let thisRow = squares.map((square, index) => {
            return Object.assign(
                {},
                square,
                {column: index,
                 id: index + (square.row * numRows) }
            );
        });
        return thisRow;
    });
    let minesPlaced = 0;
    for (let minesPlace = 0; minesPlaced < totalMines; minesPlaced++) {
        let currentLocation = minefield[Math.floor(Math.random() * numRows)][Math.floor(Math.random() * numColumns)];
        if (currentLocation.hasMine) {
            minesPlaced--;
        }
        currentLocation.hasMine = true;
    }
    return minefield;
};

const initialSettings = Object.assign(
    {},
    settings.easy,
    {minefield: prepareGame(settings.easy.rows, settings.easy.columns, settings.easy.mines)}
);

const configureDifficulty = (state, action) => {
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

const handleClickedSquare = (state, action) => {
    const clickedSquare = action.clickedSquare;
    console.log(clickedSquare);
    if (clickedSquare.hasBeenChecked  || clickedSquare === undefined) {
        console.log(clickedSquare);
        return state;
    }
    clickedSquare.hasBeenChecked = true;
    if (clickedSquare.hasMine){
        alert('BOOM');
    } else {
        const minefield = state.minefield;
        const rows = state.rows;
        const columns = state.columns;
        checkNearby(clickedSquare, minefield, rows, columns);  
    }
    return clickedSquare;
};

const checkNearby = (clickedSquare, minefield, rows, columns) => {
    const validateRow = (clickedSquare, direction) => {
        try {
            switch(direction){
                case 'north':
                    return minefield[(clickedSquare.row - 1 > -1)?clickedSquare.row - 1:undefined][clickedSquare.column];
                case 'northeast':
                    return minefield[(clickedSquare.row - 1 > -1)?clickedSquare.row - 1:undefined][(clickedSquare.column + 1 !== columns)?clickedSquare.column + 1:undefined];
                case 'southeast':
                    return minefield[(clickedSquare.row + 1 !== rows)?clickedSquare.row + 1:undefined][(clickedSquare.column + 1 !== columns)?clickedSquare.column + 1:undefined];
                case 'south':
                    return minefield[(clickedSquare.row + 1 !== rows)?clickedSquare.row + 1:undefined][clickedSquare.column];
                case 'southwest':
                    return minefield[(clickedSquare.row + 1 !== rows)?clickedSquare.row + 1:undefined][(clickedSquare.column - 1 > -1)?clickedSquare.column - 1:undefined];
                case 'northwest':
                    return minefield[(clickedSquare.row - 1 > -1)?clickedSquare.row - 1:undefined][(clickedSquare.column - 1 > -1)?clickedSquare.column - 1:undefined];
            }
        } catch(e){
            return undefined;
        }
    };
    const nearbySquares = {
        n: validateRow(clickedSquare, 'north'),
        ne: validateRow(clickedSquare, 'northeast'),
        e: minefield[(clickedSquare.row)][(clickedSquare.column + 1 !== columns)?clickedSquare.column + 1:undefined],
        se: validateRow(clickedSquare, 'southeast'),
        s: validateRow(clickedSquare, 'south'),
        sw: validateRow(clickedSquare, 'southwest'),
        w: minefield[(clickedSquare.row)][(clickedSquare.column - 1 > -1)?clickedSquare.column - 1:undefined],
        nw: validateRow(clickedSquare, 'northwest'),
    };
    console.log(Object.values(nearbySquares));
};


const gameReducer = (state = initialSettings, action) => {
    switch (action.type) {
        case types.HANDLE_DIFFICULTY_CHANGE:
            return Object.assign(
                    {},
                    state,
                    configureDifficulty(undefined, action)
                );
        case types.HANDLE_MINEFIELD_CLICK:
            return Object.assign(
                {},
                state,
                handleClickedSquare(state, action)
            )
        default:
            return state;
    }
};

export default gameReducer;