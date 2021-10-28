import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tms-js-pro-back-end.herokuapp.com/api',
});

export const imgApi = axios.create({
  baseURL: 'https://server.kemalkalandarov.lol/api',
})



export function setupApi(token) {
  api.defaults.headers = {
    ...api.defaults.headers,
    Authorization: `Token ${token}`,
  };
  imgApi.defaults.headers = {
    ...imgApi.defaults.headers,
    "Content-Type": "multipart/form-data; boundary=---011000010111000001101001"
  };

}

export default api;


