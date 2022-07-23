import {API_URL} from '../config/config';
import {BeritaType} from '../store/types';

export type inputBeritaProps = {
  key?: string;
  judul: string;
  ringkasan: string;
  konten: string;
};

async function addBerita({
  judul,
  ringkasan,
  konten,
}: inputBeritaProps): Promise<BeritaType> {
  const reponse = await fetch(`${API_URL}/berita.json`, {
    method: 'POST',
    body: JSON.stringify({
      judul,
      ringkasan,
      konten,
      tanggal: new Date().toISOString().split('T')[0],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!reponse.ok) {
    throw new Error('Something went wrong!');
  }

  await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        // 'key=AAAAJxBc2CA:APA91bHIW9a2J7Ea2jbNbuDk8HYpuBgyqyXtesYZZLpTs8QuUkBASfTO98iGDMoVIbuaiY-DPz5IX-pzPlExA_l10RjyjwAyGjWAln9rNnP1jO9aOoZrGv1GUuf1xGn0N9_gJZoWk5XR',
        'key=AAAACJL7m4c:APA91bH49rY7nTtL4odqo6tFBGpEbrWRGKquJujFexF8WQFxuMRSdqWXSYAQWD1mM8-qDuaRNiQhL82ZINidNK7u6m25UiX8VQbiyFDpSemmytFY6prQXmdQkJbLbTF2aLK9PR0LlQOs',
    },
    body: JSON.stringify({
      to: '/topics/news',
      notification: {
        title: 'Berita Merapi',
        body: ringkasan,
      },
    }),
  });

  const data = await reponse.json();

  const result = {
    key: data.name,
    judul,
    ringkasan,
    konten,
    tanggal: new Date().toISOString().split('T')[0],
  };

  return result;
}

async function loadBerita(): Promise<BeritaType[]> {
  const response = await fetch(`${API_URL}/berita.json`);
  const data = await response.json();
  const result = [];
  for (const key in data) {
    result.push({
      key,
      judul: data[key].judul,
      ringkasan: data[key].ringkasan,
      konten: data[key].konten,
      tanggal: data[key].tanggal,
    });
  }
  return result;
}

async function removeBerita({key}: {key: string}): Promise<void> {
  const response = await fetch(`${API_URL}/berita/${key}.json`, {
    method: 'DELETE',
  });

  const result = await response.json();

  return result;
}

async function updateBerita({
  key,
  judul,
  konten,
  ringkasan,
}: inputBeritaProps): Promise<BeritaType> {
  const response = await fetch(`${API_URL}/berita/${key}.json`, {
    method: 'PATCH',
    body: JSON.stringify({
      judul,
      konten,
      ringkasan,
      tanggal: new Date().toISOString().split('T')[0],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  const result = {
    key: key || '',
    judul: data.judul || '',
    ringkasan: data.ringkasan || '',
    konten: data.konten || '',
    tanggal: data.tanggal || '',
  };

  return result;
}

export const beritaService = {
  addBerita,
  loadBerita,
  updateBerita,
  removeBerita,
};
