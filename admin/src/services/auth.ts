// admin/src/services/auth.ts
import { request } from '@/lib/axios';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;

}

export interface UserProfile {
  id: number;
  username: string;
  nickname?: string;
  email?: string;
  avatar?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export const authApi = {
  login: (params: LoginParams) => {
    return request.post<LoginResponse>('/auth/login', params);
  },
  
  register: (params: LoginParams & { nickname?: string }) => {
    return request.post<LoginResponse>('/auth/register', params);
  },



  // 获取用户详细信息
  getUserProfile: () => {
    return request.get<UserProfile>('/user/profile');
  },
};
