# StoreUI Docker 部署指南

## 🚀 快速开始

### 1. 构建并推送镜像

```bash
# 给脚本添加执行权限
chmod +x docker-build.sh

# 运行构建脚本
./docker-build.sh
```

### 2. 本地测试

#### 使用 Docker 命令
```bash
# 拉取最新镜像
docker pull shindouhiro/storeui:latest

# 运行容器
docker run -d -p 8080:80 --name storeui shindouhiro/storeui:latest

# 访问应用
open http://localhost:8080
```

#### 使用 Docker Compose
```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f storeui

# 停止服务
docker-compose down
```

## 📋 镜像信息

- **镜像名称**: `shindouhiro/storeui`
- **端口**: 80 (容器内) / 8080 (宿主机)
- **基础镜像**: `nginx:alpine`
- **构建方式**: 多阶段构建

## 🔧 配置说明

### Nginx 配置特性

- ✅ **Gzip 压缩**: 自动压缩静态资源
- ✅ **缓存优化**: 静态资源长期缓存，HTML 文件不缓存
- ✅ **SPA 路由支持**: 支持 React Router 等前端路由
- ✅ **安全头**: 添加基本的安全响应头
- ✅ **健康检查**: `/health` 端点用于健康检查
- ✅ **错误处理**: 404 重定向到 index.html

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `NODE_ENV` | `production` | 运行环境 |

## 🌐 访问地址

- **本地访问**: http://localhost:8080
- **健康检查**: http://localhost:8080/health

## 📊 性能优化

### 构建优化
- 多阶段构建减少镜像大小
- 使用 Alpine Linux 基础镜像
- 只复制必要的构建产物

### 运行时优化
- Nginx 静态文件服务
- Gzip 压缩
- 浏览器缓存策略
- 非 root 用户运行

## 🔍 故障排除

### 常见问题

1. **端口被占用**
   ```bash
   # 查看端口占用
   lsof -i :8080
   
   # 停止占用端口的进程
   docker stop storeui
   ```

2. **镜像拉取失败**
   ```bash
   # 检查网络连接
   docker pull hello-world
   
   # 重新登录 Docker Hub
   docker login
   ```

3. **容器启动失败**
   ```bash
   # 查看容器日志
   docker logs storeui
   
   # 检查容器状态
   docker ps -a
   ```

### 日志查看

```bash
# 查看 Nginx 访问日志
docker exec storeui tail -f /var/log/nginx/access.log

# 查看 Nginx 错误日志
docker exec storeui tail -f /var/log/nginx/error.log
```

## 🔄 更新部署

### 自动更新
```bash
# 拉取最新镜像
docker pull shindouhiro/storeui:latest

# 停止旧容器
docker stop storeui

# 删除旧容器
docker rm storeui

# 启动新容器
docker run -d -p 8080:80 --name storeui shindouhiro/storeui:latest
```

### 使用 Docker Compose 更新
```bash
# 拉取最新镜像
docker-compose pull

# 重启服务
docker-compose up -d
```

## 📝 开发说明

### 本地开发
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev
```

### 构建测试
```bash
# 构建项目
pnpm run build

# 本地测试构建结果
npx serve dist/public
```

## 🔗 相关链接

- [Docker Hub 仓库](https://hub.docker.com/r/shindouhiro/storeui)
- [Nginx 官方文档](https://nginx.org/en/docs/)
- [Docker 官方文档](https://docs.docker.com/) 
