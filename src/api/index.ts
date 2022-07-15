import {API_URL} from '../config/config';

export const getURL = (params: string) => {
  return `${API_URL}${params}`;
};
