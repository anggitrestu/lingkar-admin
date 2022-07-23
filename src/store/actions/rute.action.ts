import {RuteActionTypes, RuteType, RUTE_LOAD} from '../types';
import {failure, request} from './common.actions';

import {ruteService, dukuhTypeProps} from '../../services';

const loadRuteSuccess = (payload: any): RuteActionTypes => ({
  type: RUTE_LOAD,
  payload: payload,
});

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
