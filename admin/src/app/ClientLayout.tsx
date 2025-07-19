'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ProLayout } from '@ant-design/pro-components';
import type { MenuDataItem } from '@ant-design/pro-components';
import type { AvatarProps } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  ShopOutlined,
  FileOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import './globals.css';

const menuData = [
  {
    path: '/dashboard',
    name: '仪表盘',
    icon: <DashboardOutlined />,
  },
  {
    path: '/users',
    name: '用户管理',
    icon: <UserOutlined />,
    children: [
      {
        path: '/users/list',
        name: '用户列表',
        icon: <TeamOutlined />,
      },
      {
        path: '/users/settings',
        name: '用户设置',
        icon: <SettingOutlined />,
      },
    ],
  },
  {
    path: '/products',
    name: '商品管理',
    icon: <ShopOutlined />,
  },
  {
    path: '/categories',
    name: '分类管理',
    icon: <BarsOutlined />,
  },
  {
    path: '/orders',
    name: '订单管理',
    icon: <BarsOutlined />,
  },
  {
    path: '/files',
    name: '文件管理',
    icon: <FileOutlined />,
  },
];

function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 检查是否已登录
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  // 在客户端渲染之前返回一个加载状态或空内容
  if (!mounted) {
    return <div className="w-full h-screen bg-gray-50" />;
  }

  return (
    <ProLayout
      title="管理后台"
      logo="https://preview.pro.ant.design/logo.svg"
      route={{
        path: '/',
        routes: menuData,
      }}
      location={{ 
        pathname: pathname || '/dashboard'
      }}
      menu={{
        request: async () => menuData,
      }}
      menuItemRender={(item: MenuDataItem, dom: React.ReactNode) => (
        <div onClick={() => router.push(item.path || '/dashboard')}>
          {dom}
        </div>
      )}
      fixSiderbar
      layout="mix"
      navTheme="light"
      contentStyle={{ minHeight: '100vh' }}
      avatarProps={{
        src: 'https://randomuser.me/api/portraits/men/32.jpg',
        title: '管理员',
        render: (props: AvatarProps, dom: React.ReactNode) => (
          <div
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="cursor-pointer"
          >
            {dom}
            <span className="ml-2 text-red-500">退出</span>
          </div>
        ),
      }}
    >
      <div className="p-8 bg-white min-h-[80vh]">{children}</div>
    </ProLayout>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 在初始渲染时，返回children以避免闪烁
  if (!mounted) {
    return children;
  }

  const isLoginPage = pathname === '/login';
  if (isLoginPage) {
    return children;
  }

  return <AdminLayout>{children}</AdminLayout>;
} 
