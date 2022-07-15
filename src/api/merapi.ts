import {getURL} from './index';

export const getInfo = async (status: string) => {
  try {
    let statusLower = status.toLowerCase();
    const response = await fetch(getURL(`/merapi/${statusLower}.json`));
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    const result = [];

    for (const key in resData) {
      result.push({
        key,
        info: resData[key].info,
      });
    }

    return result;
  } catch (error: any) {
    console.log('error get status info: ', error.message);
  }
};

export const addInfo = async (status: string, info: string) => {
  try {
    status = status.toLowerCase();
    const response = await fetch(getURL(`/merapi/${status}.json`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        info,
      }),
    });
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    return response;
  } catch (e: any) {
    console.log('error add status info: ', e.message);
  }
};

export const removeInfo = async (status: string, id: string) => {
  try {
    status = status.toLowerCase();
    const response = await fetch(getURL(`/merapi/${status}/${id}.json`), {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    // console.log('delete response: ', response);

    return response;
  } catch (e: any) {
    console.log('error delete status info: ', e.message);
  }
};
