export type MerapiStatusType = {
  status: string;
};

export type MerapiInfoType = {
  key: string;
  info: string;
};

export const MERAPI_UPDATE_STATUS = 'MERAPI_UPDATE_STATUS';
export const MERAPI_UPDATE_INFO = 'MERAPI_UPDATE_INFO';
export const MERAPI_DELETE_INFO = 'MERAPI_DELETE_INFO';
export const MERAPI_ADD_INFO = 'MERAPI_ADD_INFO';

type MerapiDeleteInfoAction = {
  type: typeof MERAPI_DELETE_INFO;
  payload: string;
};

type MerapiUpdateStatusAction = {
  type: typeof MERAPI_UPDATE_STATUS;
  payload: MerapiStatusType;
};

type MerapiUpdateInfoAction = {
  type: typeof MERAPI_UPDATE_INFO;
  payload: MerapiInfoType[];
};

type MerapiAddInfoAction = {
  type: typeof MERAPI_ADD_INFO;
  payload: MerapiInfoType;
};

export type MerapiActionTypes =
  | MerapiUpdateStatusAction
  | MerapiUpdateInfoAction
  | MerapiDeleteInfoAction
  | MerapiAddInfoAction;
