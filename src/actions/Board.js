import {
    INIT_URL,
    CLEAR_BOARD,
    GET_BOARDS,
    ADD_BOARD,
    BOARD_ERROR,
    GET_BOARD,
    GET_LIST,
    ADD_LIST,
    MOVE_LIST,
    MOVE_CARD,
    GET_CARD,
    ADD_CARD,
    EDIT_CARD,
    GET_ACTIVITY
} from "../constants/ActionTypes";
import axios from '../config/Api';

import { createBrowserHistory } from 'history'

const config = {
    headers: {
      'Content-Type': 'application/json',
    },
};

export const history = createBrowserHistory();

export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

export const getBoards = ({ userID: userID }) => async (dispatch) => {
    try {
      dispatch({ type: CLEAR_BOARD });
  
      const res = await axios.post('/board/list', { userID: userID });
  
      dispatch({
        type: GET_BOARDS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};

export const addBoard = (formData, history) => async (dispatch) => {
    try {
      const body = JSON.stringify(formData);
  
      const res = await axios.post('/board/create', body, config);

      dispatch({
        type: ADD_BOARD,
        payload: res.data.board,
      });
  
      history.push(`/pr/dashboard`);
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};

// Get board
export const getBoard = (id) => async (dispatch) => {
    try {
      const res = await axios.get(`/board/detail/${id}`);
  
      if (res) {
        axios.defaults.headers.common['boardId'] = id;
      } else {
        delete axios.defaults.headers.common['boardId'];
      }
  
      dispatch({
        type: GET_BOARD,
        payload: { ...res.data, listObjects: [], cardObjects: [] },
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};

// Get list
export const getList = (id) => async (dispatch) => {
    try {
      const res = await axios.get(`/lists/${id}`);
  
      dispatch({
        type: GET_LIST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};

// Add list
export const addList = (formData) => async (dispatch) => {
    try {
      const body = JSON.stringify(formData);
  
      const res = await axios.post('/lists/create', body, config);
  
      dispatch({
        type: ADD_LIST,
        payload: res.data,
      });
  
      dispatch(getActivity());
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};

// Move list
export const moveList = (listId, formData) => async (dispatch) => {
    try {
      const body = JSON.stringify(formData);
  
      const res = await axios.patch(`/lists/move/${listId}`, body, config);
  
      dispatch({
        type: MOVE_LIST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};

// Get card
export const getCard = (id) => async (dispatch) => {
    try {
      const res = await axios.get(`/cards/${id}`);
  
      dispatch({
        type: GET_CARD,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};

// Add card
export const addCard = (formData) => async (dispatch) => {
    try {
      const body = JSON.stringify(formData);
  
      const res = await axios.post('/cards/create', body, config);
  
      dispatch({
        type: ADD_CARD,
        payload: res.data,
      });
  
      dispatch(getActivity());
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};

// Edit card
export const editCard = (cardId, formData) => async (dispatch) => {
    try {
      const res = await axios.patch(`/cards/edit/${cardId}`, formData, config);
  
      dispatch({
        type: EDIT_CARD,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};

// Move card
export const moveCard = (cardId, formData) => async (dispatch) => {
    try {
      const body = JSON.stringify(formData);
  
      const res = await axios.patch(`/cards/move/${cardId}`, body, config);
  
      dispatch({
        type: MOVE_CARD,
        payload: res.data,
      });
  
      dispatch(getActivity());
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};


// Get activity
export const getActivity = () => async (dispatch) => {
    try {
      const boardId = axios.defaults.headers.common['boardId'];
  
      const res = await axios.get(`/boards/activity/${boardId}`);
  
      dispatch({
        type: GET_ACTIVITY,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};


