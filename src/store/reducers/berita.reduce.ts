import {
  BeritaActionTypes,
  BeritaType,
  BERITA_ADD,
  BERITA_LOAD,
  BERITA_DELETE,
  BERITA_UPDATE,
} from '../types';

type BeritaState = {
  berita: BeritaType[];
};

const initialState: BeritaState = {
  berita: [],
};

export function beritaReducer(
  state = initialState,
  action: BeritaActionTypes,
): BeritaState {
  switch (action.type) {
    case BERITA_ADD:
      return {
        ...state,
        berita: [...state.berita, action.payload],
      };

    case BERITA_LOAD:
      return {
        ...state,
        berita: action.payload,
      };

    case BERITA_UPDATE:
      return {
        ...state,
        berita: state.berita.map(berita => {
          if (berita.key === action.payload.key) {
            return action.payload;
          }
          return berita;
        }),
      };

    case BERITA_DELETE:
      return {
        ...state,
        berita: state.berita.filter(berita => berita.key !== action.payload),
      };

    default:
      return state;
  }
}
