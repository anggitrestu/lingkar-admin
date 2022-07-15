import merapi from './merapi';
import news from './news';
import padukuhan from './padukuhan';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  merapi,
  news,
  padukuhan,
});

export type RootState = ReturnType<typeof rootReducer>;
