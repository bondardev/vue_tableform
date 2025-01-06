import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/http://159.253.18.155/api/v1',
  headers: {
    Accept: 'application/json',
  },
});

// Лог запросов
api.interceptors.request.use((config) => {
  console.log('Запрос отправлен на:', config.url);
  return config;
});

export default api;
