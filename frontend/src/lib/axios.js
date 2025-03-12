import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:  'http://localhost:1120/api',
    withCredentials: true
})