import * as types from '../constants/action-type';
import { MEMO_TYPE, MEMO_RATIO } from '../constants/ui';

const initialMemo = {
  id    : 0,
  text  : '',
  type  : MEMO_TYPE[0],
  ratio : MEMO_RATIO[0]
};

const memo = (state = initialMemo, action) => {
  switch (action.type) {
  case types.ADD_MEMO:
    return {
      ...initialMemo,
      id: Date.now().toString(36),
      type: action.payload.type || initialMemo.type
    };
  case types.EDIT_MEMO:
    if (state.id !== action.payload.id) {
      return state;
    }
    return {
      ...state,
      text  : action.payload.text || state.text,
      type  : action.payload.type || state.type,
      ratio : action.payload.ratio || state.ratio
    };
  default:
    return state;
  }
};

const memos = (state = [], action) => {
  switch (action.type) {
  case types.ADD_MEMO:
    return [...state, memo({}, action)];
  case types.EDIT_MEMO:
    return state.map(m => memo(m, action));
  case types.DELETE_MEMO:
    return state.filter(m => m.id !== action.payload.id );
  case types.RECEIVE_MEMOS:
    return action.payload.memos;
  case types.CLEAR_MEMOS:
    return [];
  default:
    return state;
  }
};

export default memos;
