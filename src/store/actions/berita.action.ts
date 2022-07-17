import {
  BERITA_ADD,
  BeritaActionTypes,
  BeritaType,
  BERITA_LOAD,
  BERITA_DELETE,
  BERITA_UPDATE,
} from '../types';
import {ActionCreator} from 'redux';
import {failure, request} from './common.actions';

import {inputBeritaProps, beritaService} from '../../services';

const addBeritaSuccess: ActionCreator<BeritaActionTypes> = (
  payload: BeritaType,
): BeritaActionTypes => ({
  type: BERITA_ADD,
  payload,
});

const loadBeritaSuccess = (payload: BeritaType[]): BeritaActionTypes => ({
  type: BERITA_LOAD,
  payload,
});

const removeBeritaSuccess = (payload: string): BeritaActionTypes => ({
  type: BERITA_DELETE,
  payload,
});

const updateBeritaSuccess = (payload: BeritaType): BeritaActionTypes => ({
  type: BERITA_UPDATE,
  payload,
});

export function addBerita({ringkasan, judul, konten}: inputBeritaProps) {
  return (dispatch: any) => {
    dispatch(request());
    const payload = {
      judul,
      ringkasan,
      konten,
    };
    return beritaService
      .addBerita(payload)
      .then((data: BeritaType) => {
        dispatch(addBeritaSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}

export function loadBerita() {
  return (dispatch: any) => {
    dispatch(request());
    return beritaService
      .loadBerita()
      .then((data: BeritaType[]) => {
        dispatch(loadBeritaSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}

export function removeBerita({key}: {key: string}) {
  return (dispatch: any) => {
    dispatch(request());
    return beritaService
      .removeBerita({key})
      .then(() => {
        dispatch(removeBeritaSuccess(key));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}

export function updateBerita({
  key,
  judul,
  konten,
  ringkasan,
}: inputBeritaProps) {
  return (dispatch: any) => {
    dispatch(request());
    const payload = {
      judul,
      konten,
      ringkasan,
    };
    return beritaService
      .updateBerita({key, ...payload})
      .then((data: BeritaType) => {
        dispatch(updateBeritaSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}
