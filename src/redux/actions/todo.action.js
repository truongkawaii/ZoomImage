import actions from './action.type';

export const getDataTodo = () => ({
  type: actions.GET_LIST_TODO,
});
export const getDataTodoSuccess = (payload) => ({
  type: actions.GET_LIST_TODO_SUCCESS,
  payload,
});

export const addDataTodo = (payload) => ({
  type: actions.ADD_TODO,
  payload,
});

export const addDataTodoSuccess = (payload) => ({
  type: actions.ADD_TODO_SUCCESS,
  payload,
});

export const removeDataTodo = (payload) => ({
  type: actions.REMOVE_TODO,
  payload,
});

export const editDataTodo = (payload) => ({
  type: actions.EDIT_TODO,
  payload,
});

export const RemoveMuchData = () => ({
  type: actions.REMOVE_MULTIL_DATA,
});
export const editTextData = (payload) => ({
  type: actions.EDIT_TEXT,
  payload,
});
