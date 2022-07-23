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
export const RUTE_SELECT = 'RUTE_SELECT';

type RuteLoadAction = {
  type: typeof RUTE_LOAD;
  payload: RuteType;
};

type RuteSelectAction = {
  type: typeof RUTE_SELECT;
  payload: string;
};

export type RuteActionTypes = RuteLoadAction | RuteSelectAction;
