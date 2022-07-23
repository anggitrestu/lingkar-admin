import {API_URL} from '../config/config';
import {RuteType, PadukuhanType} from '../store/types';


export type dukuhTypeProps = PadukuhanType[]

async function loadRute(dukuh : dukuhTypeProps) {
  try {

    const rute: RuteType = {
      pengungsian: [],
      titik_kumpul: [],
    };

    for (const duku of dukuh) {
      const response = await fetch(`${API_URL}/rute/${duku.nama}.json`);
      const data = await response.json();
      console.log('duku data', data);
      if (data !== null) {
        if (data.pengungsian) {
          for (const key in data.pengungsian) {
            rute.pengungsian.push({
              key,
              nama: data.pengungsian[key].nama,
              deskripsi: data.pengungsian[key].deskripsi,
              latitude: data.pengungsian[key].latitude,
              longitude: data.pengungsian[key].longitude,
              dukuh: duku.nama,
              tipe: "Pengungsian"
            });
          }
        }
        if (data.titik_kumpul) {
          for (const key in data.titik_kumpul) {
            rute.titik_kumpul.push({
              key,
              nama: data.titik_kumpul[key].nama,
              deskripsi: data.titik_kumpul[key].deskripsi,
              latitude: data.titik_kumpul[key].latitude,
              longitude: data.titik_kumpul[key].longitude,
              dukuh: duku.nama,
              tipe: "Titik Kumpul"
            });
          }
        }
      }
    }

    return rute;
  } catch (error) {
    console.log('error', error);
  }
}

type inputAddRute = {
  dukuh: string;
  tipe: string;
  nama: string;
  deskripsi: string;
  latitude: string;
  longitude: string;
};

async function addRute({
  dukuh,
  tipe,
  nama,
  deskripsi,
  latitude,
  longitude,
}: inputAddRute) {
  try {
    tipe = tipe.toLowerCase();
    tipe = tipe.replace(/ /g, '_');
    const response = await fetch(`${API_URL}/rute/${dukuh}/${tipe}.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama,
        deskripsi,
        latitude,
        longitude,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw new Error();
  }
}

async function deleteRute({
  dukuh,
  tipe,
  key,
}: {
  dukuh: string;
  tipe: string;
  key: string;
}) {
  try {
    console.log("rute", dukuh, tipe, key)
    // convert tipe from Titik Kumpul to titik_kumpul
    tipe = tipe.toLowerCase();
    tipe = tipe.replace(/ /g, '_');
    const response = await fetch(
      `${API_URL}/rute/${dukuh}/${tipe}/${key}.json`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
}

export const ruteService = {
  loadRute,
  deleteRute,
  addRute,
};
