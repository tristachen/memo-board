import * as types from '../constants/action-type';

export const addMemo = (type) => {
  return { type: types.ADD_MEMO, payload: { type } };
};

export const editMemo = (id, data) => {
  return { type: types.EDIT_MEMO, payload: { id, ...data } };
};

export const deleteMemo = (id) => {
  return { type: types.DELETE_MEMO, payload: { id } };
};

export const clearMemos = () => {
  return { type: types.CLEAR_MEMOS };
};

export const receiveMemos = (memos) => {
  return { type: types.RECEIVE_MEMOS, payload: { memos } };
};
