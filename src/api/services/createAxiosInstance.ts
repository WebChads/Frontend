import axios from "axios";

export function createAxiosInstance(baseURL: string) {
    const axiosInstance = axios.create({
        baseURL: baseURL,
       // withCredentials: true,
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return axiosInstance;
}