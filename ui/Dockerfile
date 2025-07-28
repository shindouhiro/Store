# Multi-stage build for UI project
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 设置npm镜像源
RUN npm config set registry https://registry.npmmirror.com

# 安装pnpm
RUN npm install -g pnpm@latest

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --force

# 复制源代码
COPY . .

# 构建应用
RUN pnpm run build

# 使用 Nginx 服务静态文件
FROM nginx:alpine AS production

# 复制构建的静态文件到 Nginx 默认目录
COPY --from=builder /app/dist/public /usr/share/nginx/html

# 复制自定义的 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"] 
