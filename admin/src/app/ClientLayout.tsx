'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ProLayout } from '@ant-design/pro-components';
import type { MenuDataItem } from '@ant-design/pro-components';
import type { AvatarProps } from 'antd';
import {
  DashboardOutlined,
  ShopOutlined,
  BarsOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import './globals.css';

// 将菜单数据移到组件外部，避免重复创建
const menuData = [
  {
    path: '/dashboard',
    name: '仪表盘',
    icon: <DashboardOutlined />,
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
    path: '/messages',
    name: '留言管理',
    icon: <MessageOutlined />,
  },
];

// 预定义的路由配置
const routeConfig = {
  path: '/',
  routes: menuData,
};

// 优化的加载组件
const LoadingSpinner = () => (
  <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <div className="text-gray-500 text-sm">加载中...</div>
    </div>
  </div>
);

function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // 使用 useMemo 缓存位置配置
  const locationConfig = useMemo(() => ({
    pathname: pathname || '/dashboard'
  }), [pathname]);

  // 使用 useCallback 优化菜单项渲染
  const menuItemRender = useCallback((item: MenuDataItem, dom: React.ReactNode) => (
    <div onClick={() => router.push(item.path || '/dashboard')}>
      {dom}
    </div>
  ), [router]);

  // 使用 useCallback 优化头像渲染
  const avatarRender = useCallback((props: AvatarProps, dom: React.ReactNode) => (
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
  ), []);

  useEffect(() => {
    // 立即设置 mounted 状态
    setMounted(true);
    
    // 异步检查登录状态，不阻塞渲染
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
      }
    };
    
    // 使用 requestIdleCallback 在浏览器空闲时检查
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(checkAuth);
    } else {
      setTimeout(checkAuth, 0);
    }
  }, [router]);

  // 在客户端渲染之前返回加载状态
  if (!mounted) {
    return <LoadingSpinner />;
  }

  return (
    <ProLayout
      title="管理后台"
      logo="https://preview.pro.ant.design/logo.svg"
      route={routeConfig}
      location={locationConfig}
      menu={{
        // 直接使用静态数据，避免异步请求导致的延迟
        defaultOpenAll: false,
        ignoreFlatMenu: true,
      }}
      menuItemRender={menuItemRender}
      fixSiderbar
      layout="mix"
      navTheme="light"
      contentStyle={{ minHeight: '100vh' }}
      avatarProps={{
        src: 'https://randomuser.me/api/portraits/men/32.jpg',
        title: '管理员',
        render: avatarRender,
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
    // 立即设置 mounted 状态
    setMounted(true);
  }, []);

  // 检查是否为登录页面
  const isLoginPage = pathname === '/login';
  
  // 如果是登录页面，直接返回内容
  if (isLoginPage) {
    return children;
  }

  // 如果还未挂载，返回加载状态
  if (!mounted) {
    return <LoadingSpinner />;
  }

  return <AdminLayout>{children}</AdminLayout>;
} 
