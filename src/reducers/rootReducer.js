/** import reducers */
import { combineReducers } from 'redux';
import settings from './gameReducers';
import menu from './menuReducers';

const rootReducer = combineReducers({
    settings,
    menu
});

export default rootReducer;