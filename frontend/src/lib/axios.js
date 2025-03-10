import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:  'http://localhost:1114/api',
    withCredentials: true
})