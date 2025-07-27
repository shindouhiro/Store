// admin/src/lib/axios.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';

// 创建 axios 实例
const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    console.log(response,'response')
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          // token 过期或未登录
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          message.error('登录已过期，请重新登录');
          break;
        case 403:
          message.error('没有权限访问');
          break;
        case 404:
          message.error('请求的资源不存在');
          break;
        case 500:
          message.error('服务器错误');
          break;
        default:
          message.error((error.response.data as ErrorResponse)?.message || '请求失败');
      }
    } else if (error.request) {
      message.error('网络请求失败，请检查网络连接');
    } else {
      message.error('请求配置错误');
    }
    return Promise.reject(error);
  }
);

// 封装请求方法
export const request = {
  get: <T = unknown>(url: string, config = {}) => {
    return http.get<T>(url, config);
  },
  post: <T = unknown>(url: string, data = {}, config = {}) => {
    return http.post<T>(url, data, config);
  },
  put: <T = unknown>(url: string, data = {}, config = {}) => {
    return http.put<T>(url, data, config);
  },
  delete: <T = unknown>(url: string, config = {}) => {
    return http.delete<T>(url, config);
  },
  patch: <T = unknown>(url: string, data = {}, config = {}) => {
    return http.patch<T>(url, data, config);
  },
};

// 类型定义
export interface Response<T = unknown> {
  code: number;
  data: T;
  message: string;
}

// 错误响应类型
interface ErrorResponse {
  message?: string;
  error?: string;
  code?: number;
}

export default http;
