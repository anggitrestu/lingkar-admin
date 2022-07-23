import {API_URL} from '../config/config';
import {MerapiInfoType, MerapiStatusType} from '../store/types';

export type updateStatusProps = {
  status: string;
};

export type addInfoProps = {
  status: string;
  info: string;
};

async function updateStatus({
  status,
}: updateStatusProps): Promise<MerapiStatusType> {
  const reponse = await fetch(`${API_URL}/merapi.json`, {
    method: 'PATCH',
    body: JSON.stringify({status}),
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
      to: '/topics/status',
      notification: {
        title: 'Perubahan status Merapi',
        body: `Status merapi berubah menjadi ${
          status.charAt(0).toUpperCase() + status.slice(1)
        }`,
      },
    }),
  });

  return await reponse.json();
}

async function loadStatus(): Promise<MerapiStatusType> {
  const reponse = await fetch(`${API_URL}/merapi.json`);
  const data = await reponse.json();
  return data;
}

async function getInfos(status: string) {
  status = status.toLowerCase();
  const reponse = await fetch(`${API_URL}/merapi/${status}.json`);
  const data = await reponse.json();
  const resData: MerapiInfoType[] = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      resData.push({
        key,
        info: data[key].info,
      });
    }
  }
  return resData;
}

async function addInfo({status, info}: addInfoProps) {
  status = status.toLowerCase();
  const reponse = await fetch(`${API_URL}/merapi/${status}.json`, {
    method: 'POST',
    body: JSON.stringify({info}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await reponse.json();
  return data;
}

async function removeInfo({status, key}: {status: string; key: string}) {
  status = status.toLowerCase();
  const reponse = await fetch(`${API_URL}/merapi/${status}/${key}.json`, {
    method: 'DELETE',
  });

  return await reponse.json();
}

export const merapiService = {
  updateStatus,
  loadStatus,
  addInfo,
  getInfos,
  removeInfo,
};
