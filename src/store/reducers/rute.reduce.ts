import {RuteActionTypes, RuteType, RUTE_LOAD} from '../types';

type RuteState = {
  rute: RuteType;
};

const initialState: RuteState = {
  rute: {
    pengungsian: [],
    titik_kumpul: [],
  },
};

export function ruteReducer(
  state = initialState,
  action: RuteActionTypes,
): RuteState {
  switch (action.type) {
    case RUTE_LOAD:
      return {
        ...state,
        rute: action.payload,
      };

    default:
      return state;
  }
}
