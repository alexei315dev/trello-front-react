import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    INIT_URL,
    SIGNOUT_USER_SUCCESS,
    USER_DATA,
    USER_TOKEN_SET,
} from "../constants/ActionTypes";
import axios from '../config/Api';

import { createBrowserHistory } from 'history'

export const history = createBrowserHistory();

export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

export const userSignUp = ({ username, email, password }) => {
    console.log(username, email, password);
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        axios.post('/register', {
            username: username,
            email: email,
            password: password
        }
        ).then(({ data }) => {
            localStorage.setItem("token", JSON.stringify(data.token));
            axios.defaults.headers.common['Authorization'] = "Bearer " + data.token;
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: USER_TOKEN_SET, payload: data.token });
            dispatch({ type: INIT_URL, payload: '/pr/dashboard'})
        }).catch(err => {
            dispatch({ type: FETCH_ERROR, payload: "User registeration error !" });
        });
    }
};

export const userSignIn = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        axios.post('/login', {
            email: email,
            password: password,
        }
        ).then(({ data }) => {
            console.log('data', data);
            localStorage.setItem("token", JSON.stringify(data.token));
            axios.defaults.headers.common['Authorization'] = "Bearer " + data.token;
            dispatch({ type: USER_TOKEN_SET, payload: data.token });
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: INIT_URL, payload: '/pr/dashboard'})
        }).catch(err => {
            dispatch({ type: FETCH_ERROR, payload: "User sign in error !" });
            dispatch({ type: SIGNOUT_USER_SUCCESS });
        });
    }
};

export const getUser = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        axios.get('/me',
        ).then(({ data }) => {
            dispatch({ type: USER_TOKEN_SET, payload: data.user.token });
            dispatch({ type: USER_DATA, payload: data.user });
            dispatch({ type: FETCH_SUCCESS });
        }).catch(err => {
            dispatch({ type: FETCH_ERROR, payload: "User not found." });
            dispatch({ type: SIGNOUT_USER_SUCCESS });
        });
    }
};

export const userSignOut = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch({ type: SIGNOUT_USER_SUCCESS });
    }
}