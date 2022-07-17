import {
  PadukuhanActionTypes,
  PadukuhanType,
  PADUKUHAN_LOAD,
  PADUKUHAN_SELECT,
} from '../types';

type PadukuhanState = {
  list: PadukuhanType[];
};

const initialState: PadukuhanState = {
  list: [],
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
    default:
      return state;
  }
}
