import 'babel-polyfill';
import * as settings from '../settings';
import * as types from '../actions/actionTypes';

const initialSettings = settings.easy;

const configureDifficulty = (state, action) => {
    switch (action.difficulty) {
        case 'easy':
            return {settings: settings.easy, game: prepareGame(settings.easy.rows, settings.easy.columns, settings.easy.mines)};
        case 'medium':
            return settings.medium;
        case 'hard':
            return settings.hard;
        default:
            return state;
    }
};

const prepareGame = (numRows, numColumns, totalMines) => {
    let rows = Array(numRows).fill(null);
    let minefield = rows.map((row, index) => {
        let squares = Array(numColumns).fill({
            row: index,
            column: 0,
            hasMine: false,
            hasBeenChecked: false,
            minesNearby: 0
        });
        let thisRow = squares.map((square, index) => {
            return Object.assign(
                {},
                square,
                {column: index}
            );
        });
        return thisRow;
    });
    console.log('minefield row [2] column [4]!', minefield[2][4]);
    let minesPlaced = 0;
    while (minesPlaced < totalMines) {
        let currentLocation = minefield[Math.floor(Math.random() * numRows)][Math.floor(Math.random() * numColumns)];
        if (currentLocation.hasMine) {
            return;
        }
        currentLocation.hasMine = true; 
        console.log(currentLocation);
        minesPlaced++;
    }
    console.log(minefield);
};

const gameReducer = (state = initialSettings, action) => {
    switch (action.type) {
        case types.HANDLE_DIFFICULTY_CHANGE:
            return Object.assign(
                    {},
                    state,
                    configureDifficulty(undefined, action)
                );
        default:
            return state;
    }
};

export default gameReducer;