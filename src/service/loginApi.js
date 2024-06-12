import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:2000/userService/', // 设置基本的请求地址
    timeout: 5000, // 设置请求超时时间
})
export const loginCheck = async (username, password) => {
    try {
        const response = await instance.post('/loginCheck', { username, password });
        return response.data; // 返回响应数据
    } catch (error) {
        // 处理错误
        console.error('Login failed:', error);
        throw error;
    }
};