import 'babel-polyfill';
import * as settings from '../settings';
import * as types from '../actions/actionTypes';

const initialSettings = settings.easy;

const configureDifficulty = (state, action) => {
    switch (action.difficulty) {
        case 'easy':
            return settings.easy;
        case 'medium':
            return settings.medium;
        case 'hard':
            return settings.hard;
        default:
            return state;
    }
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