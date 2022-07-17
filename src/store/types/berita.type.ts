export type BeritaType = {
  key: string;
  judul: string;
  ringkasan: string;
  konten: string;
  tanggal: string;
};

export const BERITA_ADD = 'BERITA_ADD';
export const BERITA_DELETE = 'BERITA_DELETE';
export const BERITA_UPDATE = 'BERITA_UPDATE';
export const BERITA_LOAD = 'BERITA_LOAD';

type BeritaAddAction = {
  type: typeof BERITA_ADD;
  payload: BeritaType;
};

type BeritaLoadAction = {
  type: typeof BERITA_LOAD;
  payload: BeritaType[];
};

type BeritaUpdateAction = {
  type: typeof BERITA_UPDATE;
  payload: BeritaType;
};

type BeritaDeleteAction = {
  type: typeof BERITA_DELETE;
  payload: string;
};

export type BeritaActionTypes =
  | BeritaAddAction
  | BeritaLoadAction
  | BeritaUpdateAction
  | BeritaDeleteAction;
