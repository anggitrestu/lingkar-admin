type Rute = {
  key: string;
  nama: string;
  deskripsi: string;
  latitude: string;
  longitude: string;
  dukuh: string;
  tipe: string;
};

export type RuteType = {
  pengungsian: Rute[];
  titik_kumpul: Rute[];
};

export const RUTE_LOAD = 'RUTE_LOAD';

type RuteLoadAction = {
  type: typeof RUTE_LOAD;
  payload: RuteType;
};

export type RuteActionTypes = RuteLoadAction;
