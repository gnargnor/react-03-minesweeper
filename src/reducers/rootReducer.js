/** import reducers */
import { combineReducers } from 'redux';
import settings from './gameReducers';
import minefield from './minefieldReducers';

const rootReducer = combineReducers({
    settings,
    minefield
});

export default rootReducer;