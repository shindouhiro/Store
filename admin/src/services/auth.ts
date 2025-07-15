// admin/src/services/auth.ts
import { request } from '@/lib/axios';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
    nickname?: string;
  };
}

export const authApi = {
  login: (params: LoginParams) => {
    return request.post<LoginResponse>('/auth/login', params);
  },
  
  register: (params: LoginParams & { nickname?: string }) => {
    return request.post<LoginResponse>('/auth/register', params);
  },

  // 获取当前用户信息
  getCurrentUser: () => {
    return request.get<LoginResponse['user']>('/auth/me');
  },
};
