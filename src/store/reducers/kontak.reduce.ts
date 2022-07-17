// duplicate function with kontak.reduce

import {
  KontakActionTypes,
  KontakType,
  KONTAK_ADD,
  KONTAK_DELETE,
  KONTAK_UPDATE,
  KONTAK_LOAD,
} from '../types';

type KontakState = {
  kontak: KontakType[];
};

const initialState: KontakState = {
  kontak: [],
};

export function kontakReducer(
  state = initialState,
  action: KontakActionTypes,
): KontakState {
  switch (action.type) {
    case KONTAK_ADD:
      return {
        ...state,
        kontak: [...state.kontak, action.payload],
      };

    case KONTAK_LOAD:
      return {
        ...state,
        kontak: action.payload,
      };

    case KONTAK_UPDATE:
      return {
        ...state,
        kontak: state.kontak.map(kontak => {
          if (kontak.key === action.payload.key) {
            return action.payload;
          }
          return kontak;
        }),
      };

    case KONTAK_DELETE:
      return {
        ...state,
        kontak: state.kontak.filter(kontak => kontak.key !== action.payload),
      };

    default:
      return state;
  }
}
