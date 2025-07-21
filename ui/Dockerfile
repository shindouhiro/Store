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

# Production stage
FROM nginx:alpine AS production

# 复制构建产物到 Nginx 目录
COPY --from=builder /app/dist/public /usr/share/nginx/html

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 安装curl用于健康检查
RUN apk add --no-cache curl

# 暴露端口
EXPOSE 80

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost || exit 1

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"] 
