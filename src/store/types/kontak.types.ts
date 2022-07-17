export type KontakType = {
  key: string;
  nama: string;
  keterangan: string;
  no_hp: string;
  dukuh: string;
};

export const KONTAK_ADD = 'KONTAK_ADD';
export const KONTAK_DELETE = 'KONTAK_DELETE';
export const KONTAK_UPDATE = 'KONTAK_UPDATE';
export const KONTAK_LOAD = 'KONTAK_LOAD';

type KontakAddAction = {
  type: typeof KONTAK_ADD;
  payload: KontakType;
};

type KontakLoadAction = {
  type: typeof KONTAK_LOAD;
  payload: KontakType[];
};

type KontakUpdateAction = {
  type: typeof KONTAK_UPDATE;
  payload: KontakType;
};

type KontakDeleteAction = {
  type: typeof KONTAK_DELETE;
  payload: string;
};

export type KontakActionTypes =
  | KontakAddAction
  | KontakLoadAction
  | KontakUpdateAction
  | KontakDeleteAction;
