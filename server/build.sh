#!/bin/bash

# 确保在正确的目录下
echo "📁 脚本执行目录: $(pwd)"

# 检查是否在server目录下
if [[ ! -f "package.json" ]]; then
    echo "❌ 未找到package.json，请确保在server目录下执行此脚本"
    exit 1
fi

# 设置变量
IMAGE_NAME="shindouhiro/storeserver"
VERSION=$(date +%Y%m%d-%H%M%S)
LATEST_TAG="latest"
PLATFORMS="linux/amd64,linux/arm64"

echo "🚀 开始构建流程..."

# 配置npm镜像源
echo "🔧 配置npm镜像源..."
npm config set registry https://registry.npmmirror.com

# 检查pnpm是否安装
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm未安装，正在安装..."
    npm install -g pnpm
fi

# 配置pnpm镜像源
echo "🔧 配置pnpm镜像源..."
pnpm config set registry https://registry.npmmirror.com

# 清理旧的构建产物
echo "🧹 清理旧的构建产物..."
rm -rf dist/

# 本地构建
echo "📦 开始本地构建..."
echo "安装依赖..."
pnpm install 

echo "开始构建..."
# 方案1：直接使用TypeScript编译器
echo "🔨 使用TypeScript编译器构建..."
npx tsc -p tsconfig.json

# 检查构建结果
if [ $? -ne 0 ]; then
    echo "⚠️ TypeScript编译失败，尝试使用webpack构建..."
    # 方案2：使用webpack构建（NestJS默认使用webpack）
    npx webpack --config webpack.config.js 2>/dev/null || {
        echo "⚠️ webpack构建失败，尝试手动nest构建..."
        # 方案3：在隔离环境中使用nest build
        # 创建临时目录避免扫描父目录
        TEMP_DIR="/tmp/nest-build-$$"
        mkdir -p "$TEMP_DIR"
        
        # 复制必要文件到临时目录
        cp -r src package.json tsconfig.json nest-cli.json node_modules "$TEMP_DIR/" 2>/dev/null || true
        
        cd "$TEMP_DIR"
        npx nest build 2>/dev/null || {
            cd - 
            # 最后的方案：使用简化的nest build命令，明确指定项目
            NODE_ENV=production npx nest build --webpack false
        }
        
        if [ -d "$TEMP_DIR/dist" ]; then
            cd -
            cp -r "$TEMP_DIR/dist" ./
            rm -rf "$TEMP_DIR"
        else
            cd -
            rm -rf "$TEMP_DIR"
        fi
    }
fi

# 最终检查
if [ ! -d "dist" ] || [ ! -f "dist/main.js" ]; then
    echo "❌ 构建失败，未找到构建产物!"
    echo "📂 当前目录内容："
    ls -la
    exit 1
fi

echo "✅ NestJS构建成功!"
echo "📂 构建产物："
ls -la dist/

# 构建Docker镜像
echo "🐳 开始构建Docker镜像..."

# 确保启用 buildx
echo "🔧 检查并配置 buildx..."
if ! docker buildx version > /dev/null 2>&1; then
    echo "❌ Docker buildx 未安装，请先安装 buildx"
    exit 1
fi

# 创建并使用新的构建器
BUILDER_NAME="multiarch-builder"
if ! docker buildx inspect "${BUILDER_NAME}" > /dev/null 2>&1; then
    echo "🔨 创建新的构建器: ${BUILDER_NAME}"
    docker buildx create --name "${BUILDER_NAME}" --driver docker-container --bootstrap
fi
docker buildx use "${BUILDER_NAME}"

# 登录到 Docker Hub（如果需要）
echo "🔑 登录到 Docker Hub..."
docker login

# 构建并推送多架构镜像
echo "📦 构建并推送多架构镜像: ${IMAGE_NAME}:${VERSION}"
docker buildx build \
    --platform ${PLATFORMS} \
    --tag ${IMAGE_NAME}:${VERSION} \
    --tag ${IMAGE_NAME}:${LATEST_TAG} \
    --push \
    .

if [ $? -eq 0 ]; then
    echo "✅ 多架构镜像构建并推送成功!"
    
    # 显示镜像信息
    echo "📊 镜像信息:"
    docker buildx imagetools inspect ${IMAGE_NAME}:${VERSION}
    
    echo ""
    echo "📋 镜像详情:"
    echo "   - 版本: ${IMAGE_NAME}:${VERSION}"
    echo "   - 最新: ${IMAGE_NAME}:${LATEST_TAG}"
    echo "   - 支持架构: ${PLATFORMS}"
    echo ""
    echo "🔗 拉取命令:"
    echo "   docker pull ${IMAGE_NAME}:${VERSION}"
    echo "   docker pull ${IMAGE_NAME}:${LATEST_TAG}"
    echo ""
    echo "🚀 运行命令 (会自动选择对应架构):"
    echo "   docker run -d -p 3000:3000 \\"
    echo "      -e DB_HOST=your-db-host \\"
    echo "      -e DB_PORT=3306 \\"
    echo "      -e DB_USERNAME=root \\"
    echo "      -e DB_PASSWORD=root \\"
    echo "      -e DB_DATABASE=nest_demo \\"
    echo "      --name storeserver ${IMAGE_NAME}:${LATEST_TAG}"
    echo ""
    echo "🌐 访问地址: http://localhost:3000"
    
    # 清理
    echo "🧹 清理构建器..."
    docker buildx stop "${BUILDER_NAME}"
else
    echo "❌ 镜像构建失败!"
    # 清理
    docker buildx stop "${BUILDER_NAME}"
    exit 1
fi
