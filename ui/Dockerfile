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

# 只导出静态资源
FROM alpine AS export
WORKDIR /export
COPY --from=builder /app/dist/public ./ 
