import {RuteActionTypes, RuteType, RUTE_LOAD, RUTE_SELECT} from '../types';
import {failure, request} from './common.actions';
import {ruteService, dukuhTypeProps} from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadRuteSuccess = (payload: any): RuteActionTypes => ({
  type: RUTE_LOAD,
  payload: payload,
});

// set selected rute
const selectRuteSuccess = (payload: string): RuteActionTypes => ({
  type: RUTE_SELECT,
  payload: payload,
});

export function setSelectRute(payload: string) {
  // seve to async storage
  return async (dispatch: any) => {
    try {
      await AsyncStorage.setItem('rute', payload);
      dispatch(selectRuteSuccess(payload));
    } catch (error) {
      throw error;
    }
  };
}

export function getSelectRute() {
  return async (dispatch: any) => {
    return await AsyncStorage.getItem('rute')
      .then((data: any) => {
        dispatch(selectRuteSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}

export function loadRute(dukuh: dukuhTypeProps) {
  return (dispatch: any) => {
    dispatch(request());
    return ruteService
      .loadRute(dukuh)
      .then(data => {
        dispatch(loadRuteSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}

export function loadRuteByDukuh({dukuh}: {dukuh: string}) {
  return (dispatch: any) => {
    dispatch(request());
    return ruteService
      .loadRuteByDukuh({dukuh})
      .then(data => {
        dispatch(loadRuteSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}
