/** @type {import('next').NextConfig} */
const nextConfig = {
  // 根据环境变量决定是否使用 basePath
  basePath: process.env.USE_BASEPATH === 'true' ? '/admin' : '',
  output: 'standalone',
  
  // 性能优化配置
  experimental: {
    // 启用优化的大包
    optimizePackageImports: ['@ant-design/pro-components', 'antd'],
  },
  
  // 压缩配置
  compress: true,
  
  // 图片优化
  images: {
    domains: ['preview.pro.ant.design', 'randomuser.me', 'dulizha.oss-cn-shanghai.aliyuncs.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 缓存策略
  generateEtags: false,
  
  // 预加载关键资源
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  
  async rewrites() {
    // 开发环境中使用 rewrites
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3000/:path*'  // 开发环境
        }
      ];
    }
    
    // 生产环境中也使用 rewrites（当直接访问 admin 容器时）
    return [
      {
        source: '/api/:path*',
        destination: 'http://server:3000/:path*'  // Docker生产环境
      }
    ];
  }
};

export default nextConfig;
