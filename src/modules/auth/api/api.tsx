import axios from 'axios';

const api = axios.create({
  baseURL: 'http://93.189.230.10:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Автоматически добавляет токен, если он есть
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Теперь generateToken принимает role и user_id
export const generateToken = async (role: 'coach' | 'player', user_id: string) => {
  const response = await api.post('api/v1/auth/generate-token', { role, user_id });
  localStorage.setItem('authToken', response.data.token);
};

// Регистрируем пользователя и получаем user_id из ответа
export const registerUser = async (phone_number: string, role: 'coach' | 'player') => {
  const response = await api.post('api/v1/auth/register', {
    phone_number,
    role,
  });
  return response.data; // Предполагается, что здесь есть user_id
};