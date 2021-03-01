import React from 'react';
import {Actions} from '../actions';

const initialState = {
  listtodos: [
    {
      id:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      name: 'Clean Home',
      checked: false,
    },
    {
      id:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      name: 'Clear Job',
      checked: false,
    },
  ],
};

const todoManager = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_LIST_TODO_SUCCESS:
      return {
        ...state,
        listtodos: action.payload,
      };

    case Actions.ADD_TODO:
      const {payload: data} = action;
      return {
        ...state,
        listtodos: [...state.listtodos, {...data, checked: false}],
      };
    case Actions.REMOVE_TODO:
      const {payload: id} = action;
      const listObj = [...state.listtodos].filter((item) => item.id !== id);
      return {
        ...state,
        listtodos: listObj,
      };
    case Actions.EDIT_TODO:
      const {key, check} = action.payload;
      const listData = [...state.listtodos].map((item) => {
        if (item.id === key) {
          item.checked = check;
        }
        return item;
      });
      return {
        ...state,
        listtodos: listData,
      };
    case Actions.REMOVE_MULTIL_DATA:
      const dataObj = [...state.listtodos].filter(
        (item) => item.checked !== true,
      );
      return {
        ...state,
        listtodos: dataObj,
      };
    case Actions.EDIT_TEXT:
      const {objId, name} = action.payload;
      console.log(action.payloadr);
      const listDataKey = [...state.listtodos].map((item) => {
        if (item.id === objId) {
          item.name = name;
        }
        return item;
      });
      return {
        ...state,
        listtodos: listDataKey,
      };
    default:
      return state;
  }
};
export default todoManager;
