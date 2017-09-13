/** import reducers */
import { combineReducers } from 'redux';
import settings from './gameReducers';
import menu from './menuReducers';
import minefield from './minefieldReducers';

const rootReducer = combineReducers({
    settings,
    menu,
    // minefield
});

export default rootReducer;