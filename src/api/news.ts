import {getURL} from './index';

export const addNews = async (
  title: string,
  highlight: string,
  body: string,
) => {
  try {
    const response = await fetch(getURL('/news.json'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        highlight,
        body,
        date: new Date().toISOString().split('T')[0],
      }),
    });
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    // await fetch('https://fcm.googleapis.com/fcm/send', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization:
    //       'key=AAAAJxBc2CA:APA91bHIW9a2J7Ea2jbNbuDk8HYpuBgyqyXtesYZZLpTs8QuUkBASfTO98iGDMoVIbuaiY-DPz5IX-pzPlExA_l10RjyjwAyGjWAln9rNnP1jO9aOoZrGv1GUuf1xGn0N9_gJZoWk5XR',
    //   },
    //   body: JSON.stringify({
    //     to: '/topics/news',
    //     notification: {
    //       title: 'Berita Merapi',
    //       body: highlight,
    //     },
    //   }),
    // });

    return response;
  } catch (e: any) {
    console.log('error add news: ', e.message);
  }
};

export const removeNews = async (id: string) => {
  try {
    const response = await fetch(getURL(`/news/${id}.json`), {
      method: 'DELETE',
    });
    console.log('delete response: ', response);
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    return response;
  } catch (e: any) {
    console.log('error delete news: ', e.message);
  }
};
