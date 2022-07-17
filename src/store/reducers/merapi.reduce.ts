import {
  MERAPI_UPDATE_STATUS,
  MERAPI_ADD_INFO,
  MERAPI_DELETE_INFO,
  MerapiActionTypes,
  MerapiInfoType,
  MERAPI_UPDATE_INFO,
} from '../types';

type MerapiState = {
  status: string;
  infos: MerapiInfoType[];
};

const initialState: MerapiState = {
  status: '',
  infos: [],
};

export function merapiReducer(
  state = initialState,
  action: MerapiActionTypes,
): MerapiState {
  switch (action.type) {
    case MERAPI_UPDATE_STATUS:
      return {
        ...state,
        status: action.payload.status,
      };

    case MERAPI_UPDATE_INFO:
      return {
        ...state,
        infos: action.payload,
      };

    case MERAPI_DELETE_INFO:
      return {
        ...state,
        infos: state.infos.filter(info => info.key !== action.payload),
      };

    case MERAPI_ADD_INFO:
      return {
        ...state,
        infos: [...state.infos, action.payload],
      };

    default:
      return state;
  }
}
