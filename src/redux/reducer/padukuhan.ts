export const SET_PADUKUHAN = 'SET_PADUKUHAN';
export const SET_PADUKUHAN_CONTACT = 'SET_PADUKUHAN_CONTACT';

import {Action} from '../types/types';

const initialState = {
  padukuhans: [],
  padukuhanContacts: [],
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_PADUKUHAN:
      return {
        ...state,
        padukuhans: action.payload,
      };
    case SET_PADUKUHAN_CONTACT:
      return {
        ...state,
        padukuhanContacts: action.payload,
      };
  }

  return state;
};
