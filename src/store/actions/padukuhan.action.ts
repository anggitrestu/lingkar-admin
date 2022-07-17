import {
  PADUKUHAN_LOAD,
  PADUKUHAN_SELECT,
  PadukuhanActionTypes,
  PadukuhanType,
} from '../types';
import {ActionCreator} from 'redux';
import {failure, request} from './common.actions';
import {padukuhanService} from '../../services/padukuhan.service';

const loadPadukuhanSuccess = (
  payload: PadukuhanType[],
): PadukuhanActionTypes => ({
  type: PADUKUHAN_LOAD,
  payload,
});

const selectPadukuhanSuccess = (
  payload: PadukuhanType,
): PadukuhanActionTypes => ({
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
