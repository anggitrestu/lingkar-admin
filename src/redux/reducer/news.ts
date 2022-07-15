export const SET_NEWS = 'SET_NEWS';
import {Action} from '../types/types';

const initialState = {
  news: [],
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: action.payload,
      };
  }

  return state;
};
