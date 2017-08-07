import * as types from './actionTypes';

export function handleMinefieldClick(clickedSquare){
  console.log(clickedSquare);
  return {type: types.HANDLE_MINEFIELD_CLICK, clickedSquare: clickedSquare}
}