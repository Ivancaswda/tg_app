import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === 'http://localhost:1113/api',
    withCredentials: true
})