import 'babel-polyfill';
import * as types from '../actions/actionTypes';

const initialState = {
  gameDropdown: false,
  helpDropdown: false
};

const menuReducer = (state = initialState, action) => {
  switch (action.type){
    case types.HANDLE_GAME_CLICK:
      return Object.assign(
        {},
        state,
        {gameDropdown: !action.gameDropdown}
      );
    case types.HANDLE_HELP_CLICK:
      return Object.assign(
        {},
        state,
        {helpDropdown: !action.helpDropdown}
      );
    default:
      return state;
  }
};

export default menuReducer;