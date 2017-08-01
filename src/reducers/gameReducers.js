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

const prepareGame = (numRows, numColumns, numMines) => {
    const rows = Array(numRows).fill(null);
    const minefield = rows.map((row, index) => {
        const squares = Array(numColumns).fill({
            row: index + 1,
            column: 0,
            hasMine: false,
            hasBeenChecked: false,
            minesNearby: 0
        });
        const thisRow = squares.map((square, index) => {
            return Object.assign(
                {},
                square,
                {column: index + 1}
            );
        });
        return thisRow;
    });
    console.log('minefield row 3 column 5!', minefield[2][4]);
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