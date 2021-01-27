import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {reducer as toastrReducer} from 'react-redux-toastr';
import Auth from './Auth';

export default (history) => combineReducers({
    router: connectRouter(history),
    toastr: toastrReducer,
    auth: Auth,
});