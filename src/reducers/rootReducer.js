/** import reducers */
import { combineReducers } from 'redux';
import settings from './gameReducers';

const rootReducer = combineReducers({
    settings
});

export default rootReducer;