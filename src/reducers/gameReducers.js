import 'babel-polyfill';
import * as settings from '../settings';
import * as types from '../actions/actionTypes';

const initialState = settings.easy;

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case types.HANDLE_DIFFICULTY_CHANGE:
            return Object.assign(
                    {},
                    state,
                    {
                        difficulty: action.difficulty
                    }
                );
        default:
            return state;
    }
}