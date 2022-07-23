import {
  MERAPI_UPDATE_STATUS,
  MERAPI_UPDATE_INFO,
  MerapiStatusType,
  MerapiInfoType,
  MerapiActionTypes,
  MERAPI_DELETE_INFO,
  MERAPI_ADD_INFO,
} from '../types';
import {ActionCreator} from 'redux';
import {failure, request} from './common.actions';
import {merapiService, updateStatusProps, addInfoProps} from '../../services';

const updateStatusSuccess: ActionCreator<MerapiActionTypes> = (
  payload: MerapiStatusType,
): MerapiActionTypes => ({
  type: MERAPI_UPDATE_STATUS,
  payload,
});

const updateInfoSuccess: ActionCreator<MerapiActionTypes> = (
  payload: MerapiInfoType[],
): MerapiActionTypes => ({
  type: MERAPI_UPDATE_INFO,
  payload,
});

// delete currentyly selected info
const deleteInfoSuccess = (key: string): MerapiActionTypes => ({
  type: MERAPI_DELETE_INFO,
  payload: key,
});

const addInfoSuccess = (payload: MerapiInfoType): MerapiActionTypes => ({
  type: MERAPI_ADD_INFO,
  payload,
});

export function updateStatus({status}: updateStatusProps) {
  return (dispatch: any) => {
    dispatch(request());
    return merapiService
      .updateStatus({status})
      .then((data: MerapiStatusType) => {
        dispatch(updateStatusSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}

export function loadStatus() {
  return (dispatch: any) => {
    dispatch(request());
    return merapiService
      .loadStatus()
      .then((data: MerapiStatusType) => {
        dispatch(updateStatusSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}

export function addInfo({status, info}: addInfoProps) {
  return (dispatch: any) => {
    dispatch(request());
    return merapiService
      .addInfo({status, info})
      .then(data => {
        const payload = {
          key: data.key,
          info: info,
        };
        dispatch(addInfoSuccess(payload));
      })
      .catch((error: any) => {
        console.log(error);
        dispatch(failure(error));
      });
  };
}

export function getInfo(status: string) {
  return (dispatch: any) => {
    return merapiService
      .getInfos(status)
      .then(data => {
        dispatch(updateInfoSuccess(data));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}

export function removeInfo({status, key}: {status: string; key: string}) {
  return (dispatch: any) => {
    dispatch(request());
    return merapiService
      .removeInfo({status, key})
      .then(() => {
        dispatch(deleteInfoSuccess(key));
      })
      .catch((error: any) => {
        dispatch(failure(error));
      });
  };
}
