// admin/src/services/auth.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export interface LoginParams {
  username: string;
  password: string;
}

export const login = async (params: LoginParams) => {
  try {
    const response = await api.post('/auth/login', params);
    return response.data;
  } catch (error) {
    throw error;
  }
};
