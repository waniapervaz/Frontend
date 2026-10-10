import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/users', // Port 5000 se badal kar 3000 kar dein
    withCredentials: true
});

export default api;