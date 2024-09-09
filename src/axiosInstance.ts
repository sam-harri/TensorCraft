import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://5yzv12g9td.execute-api.us-east-2.amazonaws.com/dev',
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

// If you need to handle requests or responses globally you can add interceptors
axiosInstance.interceptors.request.use(
    config => {
        // Do something before request is sent
        // For example, you could add an authentication token here
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default axiosInstance;