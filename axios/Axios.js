import axios from 'axios';

const API = axios.create({
    baseURL: 'https://the-one-api.dev/v2',
});

API.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer hdeEla6AXjjBkAlGWXh7`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
