// admin/src/app/login/page.tsx
'use client';

import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import type { LoginParams } from '@/services/auth';

export default function LoginPage() {
  const { login } = useAuth();

  const onFinish = async (values: LoginParams) => {
    try {
      await login(values);
    } catch (error) {
      // 错误已在 axios 拦截器中处理
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Form<LoginParams>
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large"
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
