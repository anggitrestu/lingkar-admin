export type PadukuhanType = {
  key: string;
  nama: string;
};

export const PADUKUHAN_LOAD = 'PADUKUHAN_LOAD';
export const PADUKUHAN_SELECT = 'PADUKUHAN_SELECT';

type PadukuhanLoadAction = {
  type: typeof PADUKUHAN_LOAD;
  payload: PadukuhanType[];
};

type PadukuhanSelectAction = {
  type: typeof PADUKUHAN_SELECT;
  payload: string;
};

export type PadukuhanActionTypes = PadukuhanLoadAction | PadukuhanSelectAction;
