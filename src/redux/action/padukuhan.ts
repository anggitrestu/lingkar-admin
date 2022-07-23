import {SET_PADUKUHAN_CONTACT} from '../reducer/padukuhan';

type dataProps = {
  key?: string;
  dukuh?: string;
  name?: string;
  phone?: string;
  profesi?: string;
};

export const getContact = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(
        `https://lingkar-merapi-default-default-rtdb.asia-southeast1.firebasedatabase.app/kontak.json`,
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      // console.log('resData', resData);
      const kontak = [];

      for (const key in resData) {
        kontak.push({
          key,
          name: resData[key].name,
          phone: resData[key].phone,
          profesi: resData[key].profesi,
          dukuh: resData[key].dukuh,
        });
      }

      dispatch({
        type: SET_PADUKUHAN_CONTACT,
        payload: kontak,
      });

      return resData;
    } catch (error) {
      throw error;
    }
  };
};

export const addContact = (data: dataProps) => {
  return async (dispatch: any, getState: any) => {
    try {
      let nama_dukuh = data.dukuh?.toLowerCase();

      const response = await fetch(
        `https://lingkar-merapi-default-default-rtdb.asia-southeast1.firebasedatabase.app/kontak.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dukuh: nama_dukuh,
            name: data.name,
            phone: data.phone,
            profesi: data.profesi,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      dispatch(getContact());

      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const updateContact = (key: string, data: dataProps) => {
  return async (dispatch: any, getState: any) => {
    try {
      let nama_dukuh = data.dukuh?.toLowerCase();

      const response = await fetch(
        `https://lingkar-merapi-default-default-rtdb.asia-southeast1.firebasedatabase.app/kontak/${key}.json`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dukuh: nama_dukuh,
            name: data.name,
            phone: data.phone,
            profesi: data.profesi,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      dispatch(getContact());

      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const removeContact = (key: string) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(
        `https://lingkar-merapi-default-default-rtdb.asia-southeast1.firebasedatabase.app/kontak/${key}.json`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      dispatch(getContact());

      return response;
    } catch (error) {
      throw error;
    }
  };
};
