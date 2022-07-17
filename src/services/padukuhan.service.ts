import {API_URL} from '../config/config';
import {PadukuhanType} from '../store/types';

async function loadPadukuhan(): Promise<PadukuhanType[]> {
  const response = await fetch(`${API_URL}/dukuh.json`);
  const data = await response.json();
  const result = [];
  for (const key in data) {
    result.push({
      key,
      nama: data[key].nama,
    });
  }
  return result;
}

export const padukuhanService = {
  loadPadukuhan,
};
