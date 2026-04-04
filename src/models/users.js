// localhost:33030/api/users/getUsers

import axios from 'axios';
import { getToken } from '../helpers/tokenStorage';

// Crear la instancia axios
export const api = axios.create({
    baseURL: 'http://localhost:33030/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken('JWTToken'/*, pasamos el valor*/ );

            //Solo si el token existe, lo añadimos a los headers
            if (token !== null) {
                config.headers.Authorization = `Bearer ${token}`;
            }

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
