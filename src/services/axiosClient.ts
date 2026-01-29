import axios from 'axios';
import { toast } from 'react-toastify';

const axiosClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        console.log('İstek gönderiliyor:', config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("HATA DETAYLARI:", error);
        const status = error.response?.status;

        toast.error(`Bir hata oluştu! Statü: ${status || 'Bağlantı hatası'}`);

        if (status === 401) {
            toast.error("Oturum süreniz doldu, lütfen tekrar giriş yapın.");
        } else if (status === 404) {
            toast.error("Aradığınız veri bulunamadı.");
        } else if (status === 500) {
            toast.error("Sunucu taraflı bir hata oluştu.");
        } else {
            toast.error("Beklenmedik bir hata meydana geldi.");
        }

        return Promise.reject(error);
    }
);

export default axiosClient;