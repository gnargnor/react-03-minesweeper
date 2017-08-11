import * as types from './actionTypes';

export function handleGameClick(gameDropdown){
  return {type: types.HANDLE_GAME_CLICK, gameDropdown: gameDropdown};
}

export function handleHelpClick(helpDropdown){
  return {type: types.HANDLE_HELP_CLICK, helpDropdown: helpDropdown};
}