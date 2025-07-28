/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/admin',
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? 'http://server:3000/:path*'  // Docker生产环境
          : 'http://localhost:3000/:path*'  // 开发环境
      }
    ];
  }
};

export default nextConfig;
