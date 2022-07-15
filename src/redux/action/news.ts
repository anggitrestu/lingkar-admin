import {SET_NEWS} from '../reducer/news';

export const getNews = () => {
  return async (dispatch: any, getState: any) => {
    try {
      console.log('getNews');
      const response = await fetch(
        'https://lingkar-merapi-default-default-rtdb.asia-southeast1.firebasedatabase.app/news.json',
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const news = [];

      for (const key in resData) {
        news.push({
          key: key,
          title: resData[key].title,
          highlight: resData[key].highlight,
          date: resData[key].date,
          body: resData[key].body,
        });
      }

      dispatch({
        type: SET_NEWS,
        payload: news,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const updateNews = (
  key: string,
  title: string,
  highlight: string,
  body: string,
) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(
        `https://lingkar-merapi-default-default-rtdb.asia-southeast1.firebasedatabase.app/news/${key}.json`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            highlight,
            body,
            date: new Date().toISOString().split('T')[0],
          }),
        },
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      dispatch(getNews());
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const removeNews = (key: string) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(
        `https://lingkar-merapi-default-default-rtdb.asia-southeast1.firebasedatabase.app/news/${key}.json`,
        {
          method: 'DELETE',
        },
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      dispatch(getNews());

      return response;
    } catch (error) {
      throw error;
    }
  };
};
