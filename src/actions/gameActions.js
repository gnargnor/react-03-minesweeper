import * as types from './actionTypes';

export function handleDifficultyChange(e){
    const difficulty = e.target.value;
    return { type: types.HANDLE_DIFFICULTY_CHANGE, difficulty: difficulty };
}