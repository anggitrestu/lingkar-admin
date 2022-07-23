import {
  PADUKUHAN_LOAD,
  PADUKUHAN_SELECT,
  PadukuhanActionTypes,
  PadukuhanType,
} from '../types';
import {failure, request} from './common.actions';
import {padukuhanService} from '../../services/padukuhan.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadPadukuhanSuccess = (
  payload: PadukuhanType[],
): PadukuhanActionTypes => ({
  type: PADUKUHAN_LOAD,
  payload,
});

const selectPadukuhanSuccess = (payload: string): PadukuhanActionTypes => ({
  type: PADUKUHAN_SELECT,
  payload,
});

export function loadPadukuhan() {
  return (dispatch: any) => {
    dispatch(request());
    return padukuhanService
      .loadPadukuhan()
      .then((data: PadukuhanType[]) => {
        dispatch(loadPadukuhanSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}

export function getSelectPadukuhan() {
  return async (dispatch: any) => {
    return await AsyncStorage.getItem('dukuh')
      .then((data: any) => {
        dispatch(selectPadukuhanSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}

export function setSelectedDukuh({dukuh}: {dukuh: string}) {
  return async (dispatch: any) => {
    try {
      await AsyncStorage.setItem('dukuh', dukuh);
      dispatch(selectPadukuhanSuccess(dukuh));
    } catch (error) {
      throw error;
    }
  };
}
