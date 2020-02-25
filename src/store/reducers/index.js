import {combineReducers} from "redux";
import filmsList from './filmsList';
import authReducer from '../reducers/auth';

const mainReducer = combineReducers({
    flm: filmsList,
    auth: authReducer,
});

export default mainReducer