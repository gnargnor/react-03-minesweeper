import 'babel-polyfill';

const initialState = {
  gameDropdown: false,
  helpDropdown: false
};

const menuReducer = (state = initialState, action) => {
  switch (action.type){
    case HANDLE_GAME_CLICK:
      return Object.assign(
        {},
        state,
        {gameDropdown: !action.gameDropdown}
      );
    case HANDLE_HELP_CLICK:
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

const HANDLE_GAME_CLICK = 'HANDLE_GAME_CLICK';
const HANDLE_HELP_CLICK = 'HANDLE_HELP_CLICK';

export const handleGameClick = (gameDropdown) => {
  return {type: HANDLE_GAME_CLICK, gameDropdown: gameDropdown};
}

export const handleHelpClick = (helpDropdown) => {
  return {type: HANDLE_HELP_CLICK, helpDropdown: helpDropdown};
}