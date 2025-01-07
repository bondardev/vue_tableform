import axios from 'axios';

const api = axios.create({
  baseURL: 'https://abztest.online/api/v1',
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
