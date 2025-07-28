/** @type {import('next').NextConfig} */
const nextConfig = {
  // 根据环境变量决定是否使用 basePath
  basePath: process.env.USE_BASEPATH === 'true' ? '/admin' : '',
  output: 'standalone',
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
