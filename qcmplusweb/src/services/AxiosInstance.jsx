import axios from 'axios';
import { getToken } from './AuthService';

const API_BASE_URL = "http://localhost:8080";

export const BASE_REST_API_URL = `${API_BASE_URL}/api/users`;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = getToken();
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;