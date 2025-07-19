// admin/src/hooks/useAuth.ts
import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { authApi, LoginParams, UserProfile } from '@/services/auth';

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // 获取用户信息
  const fetchUserProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return null;
      }

      const response = await authApi.getUserProfile();
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setLoading(false);
      return userData;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      // 如果获取用户信息失败，可能是token过期，清除本地存储并跳转到登录页
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setLoading(false);
      router.replace('/login');
      message.error('登录已过期，请重新登录');
      return null;
    }
  }, [router]);

  // 初始化时获取用户信息
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const login = useCallback(async (params: LoginParams) => {
    try {
      const response = await authApi.login(params);
      // 保存 token
      localStorage.setItem('token', response.data.access_token);
      // 获取并保存用户详细信息
      await fetchUserProfile();
      message.success('登录成功');
      router.replace('/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  }, [router, fetchUserProfile]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.replace('/login');
    message.success('已退出登录');
  }, [router]);

  const getUser = useCallback(() => {
    return user;
  }, [user]);

  // 检查是否已登录
  const isAuthenticated = useCallback(() => {
    return !!localStorage.getItem('token') && !!user;
  }, [user]);

  return {
    login,
    logout,
    getUser,
    fetchUserProfile,
    isAuthenticated,
    user,
    loading,
  };
};
