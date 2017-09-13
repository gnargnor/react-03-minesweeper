import * as settings from './settings';

const initialSettings = Object.assign(
  {},
  settings.easy,
  {minefield: prepareGame(settings.easy),
   gameDropdown: false,
   helpDropdown: false,
   time: 0,
   endTime: 0,
   gameInProgress: false,
   gameOver:false,
   flagsPlaced: 0
  }
);

export default initialSettings;