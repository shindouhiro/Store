// admin/src/app/login/page.tsx
'use client';

import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '@/services/auth';

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const onFinish = async (values: LoginFormValues) => {
    try {
      const response = await login(values);
      // 保存 token
      localStorage.setItem('token', response.access_token);
      // 保存用户信息
      localStorage.setItem('user', JSON.stringify(response.user));
      router.replace('/dashboard');
      message.success('登录成功');
    } catch (error) {
      message.error('登录失败：' + (error.response?.data?.message || '未知错误'));
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Form<LoginFormValues>
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
