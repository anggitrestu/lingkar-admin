import {
  PadukuhanActionTypes,
  PadukuhanType,
  PADUKUHAN_LOAD,
  PADUKUHAN_SELECT,
} from '../types';

type PadukuhanState = {
  list: PadukuhanType[];
  selected: string;
};

const initialState: PadukuhanState = {
  list: [],
  selected: '',
};

export function padukuhanReducer(
  state = initialState,
  action: PadukuhanActionTypes,
): PadukuhanState {
  switch (action.type) {
    case PADUKUHAN_LOAD:
      return {
        ...state,
        list: action.payload,
      };
    case PADUKUHAN_SELECT:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
}
