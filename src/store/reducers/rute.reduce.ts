import {RuteActionTypes, RuteType, RUTE_LOAD, RUTE_SELECT} from '../types';

type RuteState = {
  rute: RuteType;
  selected: string;
};

const initialState: RuteState = {
  rute: {
    pengungsian: [],
    titik_kumpul: [],
  },
  selected: '',
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

    case RUTE_SELECT:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
}
