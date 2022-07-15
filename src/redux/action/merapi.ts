import {SET_STATUS, SET_STATUS_INFO} from '../reducer/merapi';

export const loadStatus = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(
        'https://lingkar-merapi-default-default-rtdb.asia-southeast1.firebasedatabase.app/merapi.json',
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();

      dispatch({
        type: SET_STATUS,
        payload: resData.status,
      });
    } catch (error: any) {
      console.log('error load status: ', error.message);
    }
  };
};

export const getStatusInfo = () => {
  return async (dispatch: any, getState: any) => {
    const status = getState().merapi.status;
    try {
      const response = await fetch(
        `https://lingkar-merapi-default-default-rtdb.asia-southeast1.firebasedatabase.app/merapi/${status}.json`,
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const infos = [];

      for (const key in resData) {
        infos.push({
          key,
          info: resData[key].info,
        });
      }

      dispatch({
        type: SET_STATUS_INFO,
        payload: infos,
      });
    } catch (error: any) {
      console.log('error get status info: ', error.message);
    }
  };
};

export const updateStatus = (status: any) => {
  return async (dispatch: any, getState: any) => {
    const response = await fetch(
      'https://lingkar-merapi-default-default-rtdb.asia-southeast1.firebasedatabase.app/merapi.json',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
        }),
      },
    );

    // if (!response.ok) {
    //   throw new Error('Something went wrong!');
    // } else {
    //   const resData = await response.json();
    //   dispatch({
    //     type: SET_STATUS,
    //     payload: resData.status,
    //   });
    //   await fetch('https://fcm.googleapis.com/fcm/send', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization:
    //         'key=AAAAJxBc2CA:APA91bHIW9a2J7Ea2jbNbuDk8HYpuBgyqyXtesYZZLpTs8QuUkBASfTO98iGDMoVIbuaiY-DPz5IX-pzPlExA_l10RjyjwAyGjWAln9rNnP1jO9aOoZrGv1GUuf1xGn0N9_gJZoWk5XR',
    //     },
    //     body: JSON.stringify({
    //       to: '/topics/status',
    //       notification: {
    //         title: 'Perubahan status Merapi',
    //         body: `Status merapi berubah menjadi ${
    //           status.charAt(0).toUpperCase() + status.slice(1)
    //         }`,
    //       },
    //     }),
    //   });
    // }
  };
};
