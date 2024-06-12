// api.js
import axios from 'axios';
import { getToken } from './auth'; // 导入你的 getToken 函数

// 创建 axios 实例
const api = axios.create({
    baseURL: 'http://localhost:2000/essentialService/', // 你的 API 基地址
    timeout: 10000, // 设置请求超时时间
});

// 添加请求拦截器
api.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // 把 token 添加到请求头
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
