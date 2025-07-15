// admin/src/hooks/useAuth.ts
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { authApi, LoginParams } from '@/services/auth';

export const useAuth = () => {
  const router = useRouter();

  const login = useCallback(async (params: LoginParams) => {
    try {
      const response = await authApi.login(params);
      // 保存 token
      localStorage.setItem('token', response.data.access_token);
      // 保存用户信息
      localStorage.setItem('user', JSON.stringify(response.data.user));
      message.success('登录成功');
      router.replace('/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.replace('/login');
    message.success('已退出登录');
  }, [router]);

  const getUser = useCallback(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }, []);

  return {
    login,
    logout,
    getUser,
  };
};
