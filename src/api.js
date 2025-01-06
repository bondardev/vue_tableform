import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Accept': 'application/json',
  },
});

// Лог всех запросов
api.interceptors.request.use((config) => {
    console.log('Запрос отправлен на:', config.url);
    return config;
  });
  
  export default api;