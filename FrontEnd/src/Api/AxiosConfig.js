import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL, // URL de base d'API
  timeout: 10000, // délai d'attente pour les requêtes
  headers: {
    'Content-Type': 'application/json',
  },
});

// intercepteur de requête avant l'envoi de chaque requête
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// intercepteur de réponse
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.error('Backend returned status code', error.response.status);
      console.error('Response was:', error.response.data);
    } else if (error.request) {
      console.error('No response received');
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
