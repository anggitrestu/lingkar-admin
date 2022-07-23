import {combineReducers} from 'redux';
import {merapiReducer} from './merapi.reduce';
import {beritaReducer} from './berita.reduce';
import {padukuhanReducer} from './padukuhan.reduce';
import {kontakReducer} from './kontak.reduce';
import {ruteReducer} from './rute.reduce';

export const rootReducer = combineReducers({
  merapi: merapiReducer,
  berita: beritaReducer,
  padukuhan: padukuhanReducer,
  kontak: kontakReducer,
  rute: ruteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
