import * as types from './actionTypes';

export function handleDifficultyChange(e){
    const difficulty = e;
    return { type: types.HANDLE_DIFFICULTY_CHANGE, difficulty: difficulty };
}

export function handleMinefieldClick(clickedSquare){
    return { type: types.HANDLE_MINEFIELD_CLICK, clickedSquare };
}

export function handleMinefieldRightClick(rightClickedSquare){
    return { type: types.HANDLE_MINEFIELD_RIGHT_CLICK, rightClickedSquare }
}

export function handleGameClick(gameDropdown){
  return {type: types.HANDLE_GAME_CLICK, gameDropdown: gameDropdown};
}

export function handleHelpClick(helpDropdown){
  return {type: types.HANDLE_HELP_CLICK, helpDropdown: helpDropdown};
}

export function handleSmileyClick(){
    return {type: types.HANDLE_SMILEY_CLICK };
}
