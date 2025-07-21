#!/bin/bash

# 测试所有项目构建的脚本
set -e

echo "🚀 开始测试所有项目构建..."

# 确保在项目根目录
if [ ! -f "pnpm-workspace.yaml" ]; then
    echo "❌ 请在项目根目录运行此脚本"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
pnpm install

# 测试server构建
echo "🔨 测试Server构建..."
pnpm run build:server
if [ $? -eq 0 ]; then
    echo "✅ Server构建成功"
    ls -la server/dist/
else
    echo "❌ Server构建失败"
    exit 1
fi

# 测试admin构建
echo "🔨 测试Admin构建..."
pnpm run build:admin
if [ $? -eq 0 ]; then
    echo "✅ Admin构建成功"
    ls -la admin/.next/
else
    echo "❌ Admin构建失败"
    exit 1
fi

# 测试ui构建
echo "🔨 测试UI构建..."
pnpm run build:ui
if [ $? -eq 0 ]; then
    echo "✅ UI构建成功"
    ls -la ui/dist/
else
    echo "❌ UI构建失败"
    exit 1
fi

echo ""
echo "🎉 所有项目构建测试通过！"
echo ""
echo "📋 下一步："
echo "1. 配置GitHub Secrets (DOCKER_USERNAME, DOCKER_PASSWORD)"
echo "2. 推送代码到main分支触发自动部署"
echo "3. 使用 docker-compose.production.yml 部署生产环境" 
