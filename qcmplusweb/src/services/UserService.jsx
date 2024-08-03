import axiosInstance from '../services/AxiosInstance';
import {API_BASE_URL} from "./AxiosInstance";


const BASE_REST_API_URL = `${API_BASE_URL}/api/users`;

export const retrieveUsers = () => axiosInstance.get(BASE_REST_API_URL);
export const addUser = (newUser) => axiosInstance.post(BASE_REST_API_URL, newUser);
export const updateUser = (id, updateUser) => axiosInstance.put(`${BASE_REST_API_URL}/${id}`, updateUser);
export const removeUser = (id) => axiosInstance.delete(`${BASE_REST_API_URL}/${id}`);
