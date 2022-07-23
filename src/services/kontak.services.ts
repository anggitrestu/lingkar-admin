import {API_URL} from '../config/config';
import {KontakType} from '../store/types';

export type inputKontakProps = {
  key?: string;
  nama: string;
  keterangan: string;
  no_hp: string;
  dukuh: string;
  dukuh_sebelumnya?: string;
};

export type inputUpdateKontakProps = {
  key?: string;
  nama: string;
  keterangan: string;
  no_hp: string;
  dukuh: string;
  dukuh_sebelumnya: string;
};

async function addKontak({
  nama,
  keterangan,
  no_hp,
  dukuh,
}: inputKontakProps): Promise<KontakType> {
  dukuh = dukuh.toLowerCase();
  const reponse = await fetch(`${API_URL}/kontak/${dukuh}.json`, {
    method: 'POST',
    body: JSON.stringify({
      nama,
      keterangan,
      no_hp,
      dukuh: dukuh,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await reponse.json();

  const result = {
    key: data.name,
    nama,
    keterangan,
    no_hp,
    dukuh: dukuh.toLowerCase(),
  };

  return result;
}

async function loadKontak(): Promise<KontakType[]> {
  const response = await fetch(`${API_URL}/kontak.json`);
  const data = await response.json();
  const result = [];

  for (const key in data) {
    for (const key2 in data[key]) {
      result.push({
        key: key2,
        nama: data[key][key2].nama,
        keterangan: data[key][key2].keterangan,
        no_hp: data[key][key2].no_hp,
        dukuh: data[key][key2].dukuh,
      });
    }
  }

  return result;
}

async function removeKontak({
  dukuh,
  key,
}: {
  dukuh: string;
  key: string;
}): Promise<void> {
  const response = await fetch(`${API_URL}/kontak/${dukuh}/${key}.json`, {
    method: 'DELETE',
  });

  const result = await response.json();

  return result;
}

async function updateKontak({
  key,
  nama,
  keterangan,
  no_hp,
  dukuh,
  dukuh_sebelumnya,
}: inputUpdateKontakProps): Promise<KontakType> {
  dukuh = dukuh.toLowerCase();
  dukuh_sebelumnya = dukuh_sebelumnya?.toLowerCase();

  if (dukuh !== dukuh_sebelumnya) {
    await fetch(`${API_URL}/kontak/${dukuh_sebelumnya}/${key}.json`, {
      method: 'DELETE',
    });
  }

  const response = await fetch(`${API_URL}/kontak/${dukuh}/${key}.json`, {
    method: 'PATCH',
    body: JSON.stringify({
      nama,
      keterangan,
      no_hp,
      dukuh,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  const result = {
    key: key || '',
    nama: data.nama,
    keterangan: data.keterangan,
    no_hp: data.no_hp,
    dukuh: data.dukuh.toLowerCase(),
  };

  return result;
}

export const kontakService = {
  addKontak,
  loadKontak,
  updateKontak,
  removeKontak,
};
