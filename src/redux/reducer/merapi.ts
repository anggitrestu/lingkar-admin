export const SET_STATUS = 'SET_STATUS';
export const SET_STATUS_INFO = 'SET_STATUS_INFO';

import {Action} from '../types/types';

const initialState = {
  status: '',
  infos: [],
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SET_STATUS_INFO:
      return {
        ...state,
        infos: action.payload,
      };
  }

  return state;
};
