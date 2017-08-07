import * as types from './actionTypes';

export function handleMinefieldClick(clickedSquare){
  return {type: types.HANDLE_MINEFIELD_CLICK, clickedSquare: clickedSquare}
}