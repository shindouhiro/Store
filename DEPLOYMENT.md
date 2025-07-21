# 部署说明文档

本项目使用GitHub Actions自动化部署三个独立的Docker镜像：
- **Server**: NestJS后端API服务
- **Admin**: Next.js管理后台
- **UI**: 前端用户界面

## 🚀 自动化部署流程

### GitHub Actions Workflows

每个项目都有独立的部署流水线：

1. **`deploy-server.yml`** - 监听`server/`目录变化
2. **`deploy-admin.yml`** - 监听`admin/`目录变化  
3. **`deploy-ui.yml`** - 监听`ui/`目录变化

### 触发条件

- 当推送到`main`或`master`分支时
- 只有相关目录的文件发生变化才会触发对应的部署
- 支持Pull Request预览构建

## 🔧 配置GitHub Secrets

在GitHub仓库的Settings > Secrets and variables > Actions中添加：

```
DOCKER_USERNAME=your_docker_hub_username
DOCKER_PASSWORD=your_docker_hub_password_or_token
```

## 📦 Docker镜像

部署完成后，镜像将推送到：
- `shindouhiro/storeserver:latest` - NestJS服务器
- `shindouhiro/storeadmin:latest` - Next.js管理后台
- `shindouhiro/storeui:latest` - 前端UI

## 🏃‍♂️ 生产环境部署

### 1. 使用docker-compose部署

```bash
# 拉取最新镜像并启动所有服务
docker-compose -f docker-compose.production.yml up -d

# 查看服务状态
docker-compose -f docker-compose.production.yml ps

# 查看日志
docker-compose -f docker-compose.production.yml logs -f
```

### 2. 环境变量配置

创建`.env`文件：

```env
# Database Configuration
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_secure_password
DB_DATABASE=nest_demo

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379

# Application Configuration
NODE_ENV=production

# Next.js Admin Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. 服务访问

- **后端API**: http://localhost:3000
- **管理后台**: http://localhost:3001
- **前端UI**: http://localhost:80
- **Nginx代理**: http://localhost:8080 (可选)

## 🔄 更新部署

### 自动更新
每当推送代码到主分支时，对应的服务会自动重新构建和部署。

### 手动更新
```bash
# 拉取最新镜像
docker-compose -f docker-compose.production.yml pull

# 重启服务
docker-compose -f docker-compose.production.yml up -d --no-deps <service-name>

# 例如只更新server服务
docker-compose -f docker-compose.production.yml up -d --no-deps server
```

## 🏗️ 本地开发构建

### 构建单个项目
```bash
# 构建server
pnpm run build:server

# 构建admin
pnpm run build:admin

# 构建ui
pnpm run build:ui
```

### 本地Docker构建
```bash
# 构建server镜像
docker build -t storeserver:local ./server

# 构建admin镜像
docker build -t storeadmin:local ./admin

# 构建ui镜像
docker build -t storeui:local ./ui
```

## 📊 监控和日志

### 健康检查
所有服务都配置了健康检查：
- 自动重启不健康的容器
- 依赖关系确保启动顺序

### 日志查看
```bash
# 查看所有服务日志
docker-compose -f docker-compose.production.yml logs -f

# 查看特定服务日志
docker-compose -f docker-compose.production.yml logs -f server
docker-compose -f docker-compose.production.yml logs -f admin
docker-compose -f docker-compose.production.yml logs -f ui
```

## 🛠️ 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查MySQL容器是否正常启动
   - 验证环境变量配置

2. **构建失败**
   - 检查workspace配置是否正确
   - 确认依赖安装成功

3. **镜像推送失败**
   - 验证Docker Hub凭据
   - 检查网络连接

### 清理资源
```bash
# 停止并删除所有服务
docker-compose -f docker-compose.production.yml down

# 删除未使用的镜像和网络
docker system prune -f

# 删除数据卷（谨慎操作）
docker-compose -f docker-compose.production.yml down -v
``` 
