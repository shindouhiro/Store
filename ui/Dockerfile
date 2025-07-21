# 使用 Nginx 基础镜像
FROM nginx:alpine

# 复制本地构建产物到 Nginx 目录
COPY dist/public/ /usr/share/nginx/html/

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"] 
