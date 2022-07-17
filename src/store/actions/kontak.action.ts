import {
  KONTAK_ADD,
  KontakActionTypes,
  KontakType,
  KONTAK_LOAD,
  KONTAK_DELETE,
  KONTAK_UPDATE,
} from '../types';
import {ActionCreator} from 'redux';
import {failure, request} from './common.actions';

import {
  inputKontakProps,
  inputUpdateKontakProps,
  kontakService,
} from '../../services';

const addKontakSuccess: ActionCreator<KontakActionTypes> = (
  payload: KontakType,
): KontakActionTypes => ({
  type: KONTAK_ADD,
  payload,
});

const loadKontakSuccess: ActionCreator<KontakActionTypes> = (
  payload: KontakType[],
): KontakActionTypes => ({
  type: KONTAK_LOAD,
  payload,
});

const removeKontakSuccess = (payload: string): KontakActionTypes => ({
  type: KONTAK_DELETE,
  payload,
});

const updateKontakSuccess = (payload: KontakType): KontakActionTypes => ({
  type: KONTAK_UPDATE,
  payload,
});

export function addKontak({no_hp, dukuh, keterangan, nama}: inputKontakProps) {
  return (dispatch: any) => {
    dispatch(request());
    const payload = {
      nama,
      dukuh,
      keterangan,
      no_hp,
    };
    return kontakService
      .addKontak(payload)
      .then((data: KontakType) => {
        dispatch(addKontakSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}

export function loadKontak() {
  return (dispatch: any) => {
    dispatch(request());
    return kontakService
      .loadKontak()
      .then((data: KontakType[]) => {
        dispatch(loadKontakSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}

export function removeKontak({dukuh, key}: {dukuh: string; key: string}) {
  return (dispatch: any) => {
    dispatch(request());
    return kontakService
      .removeKontak({dukuh, key})
      .then(() => {
        dispatch(removeKontakSuccess(key));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}

export function updateKontak({
  key,
  nama,
  dukuh,
  keterangan,
  no_hp,
  dukuh_sebelumnya,
}: inputUpdateKontakProps) {
  return (dispatch: any) => {
    dispatch(request());
    const payload = {
      nama,
      dukuh,
      keterangan,
      no_hp,
      dukuh_sebelumnya,
    };
    return kontakService
      .updateKontak({key, ...payload})
      .then((data: KontakType) => {
        dispatch(updateKontakSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}
