
import axios from 'axios';
import { getToken } from '../helpers/tokenStorage';

// Crear la instancia axios
export const api = axios.create({
    baseURL: 'https://eventmaster-y4gy.onrender.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken('JWTToken'/*, pasamos el valor*/ );
      console.log("TOKEN EN INTERCEPTOR:", token);

      //Solo si el token existe, lo añadimos a los headers
      if (token !== null) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      console.log("HEADERS:", config.headers);

      return config;
    } catch (error) {
        return Promise.reject(error);
    }
    
  },
  (error) => {
      return Promise.reject(error);
  }
);

export default api;
