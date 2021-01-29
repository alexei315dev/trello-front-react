import { 
  GET_BOARDS, 
  CLEAR_BOARD,
  ADD_BOARD,
  BOARD_ERROR,
  GET_BOARD,
  GET_LIST,
  ADD_LIST,
  MOVE_LIST,
  GET_CARD,
  ADD_CARD,
  EDIT_CARD,
  MOVE_CARD,
} from '../constants/ActionTypes'

const INIT_STATE = {
  boards: [],
  boardDetail: {}
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CLEAR_BOARD:
      return {
        ...state,
        boardDetail: null,
      };
    case GET_BOARDS: {
      return {
        ...state,
        boards: action.payload
      };
    }
    case ADD_BOARD:
      return {
        ...state,
        boards: [action.payload, ...state.boards],
      };
    case GET_BOARD:
      return {
        ...state,
        boardDetail: { ...state.board, ...action.payload },
      };
    case BOARD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_LIST:
      return {
        ...state,
        boardDetail: {
          ...state.boardDetail,
          listObjects: [...state.board.listObjects, action.payload],
        },
      };
    case ADD_LIST:
      return {
        ...state,
        boardDetail: {
          ...state.boardDetail,
          lists: [...state.board.lists, action.payload._id],
        },
      };
    case MOVE_LIST:
      return {
        ...state,
        boardDetail: {
          ...state.boardDetail,
          lists: action.payload,
        },
      };
    case GET_CARD:
      return {
        ...state,
        boardDetail: {
          ...state.boardDetail,
          cardObjects: [...state.boardDetail.cardObjects, action.payload],
        },
      };
    case ADD_CARD:
      return {
        ...state,
        boardDetail: {
          ...state.boardDetail,
          listObjects: state.boardDetail.listObjects.map((list) =>
            list._id === action.payload.listId
              ? { ...list, cards: [...list.cards, action.payload.cardId] }
              : list
          ),
        },
      };
    case EDIT_CARD:
      return {
        ...state,
        boardDetail: {
          ...state.boardDetail,
          cardObjects: state.boardDetail.cardObjects.map((card) =>
            card._id === action.payload._id ? action.payload : card
          ),
        },
      };
    case MOVE_CARD:
      return {
        ...state,
        boardDetail: {
          ...state.boardDetail,
          listObjects: state.boardDetail.listObjects.map((list) =>
            list._id === action.payload.from._id
              ? action.payload.from
              : list._id === action.payload.to._id
              ? action.payload.to
              : list
          ),
          cardObjects: state.boardDetail.cardObjects.filter(
            (card) => card._id !== action.payload.cardId || action.payload.to._id === action.payload.from._id
          ),
        },
      };
    default:
      return state;
  }
}
