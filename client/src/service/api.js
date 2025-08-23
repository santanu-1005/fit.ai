import axios from "axios"

const API_URL = 'http://localhost:8084/api'

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        const userId = localStorage.getItem('userId');
        if(userId){
            config.headers['X-User-Id'] = userId;
        }
        return config;
    }
);

export const getActivities = () => api.get('/activities');
export const addActivity = (activity) => api.post('/activities', activity);
export const getActivityDetail = (id) => api.get(`/recomendations/activity/${id}`);    