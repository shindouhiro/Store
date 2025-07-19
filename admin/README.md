# 管理后台

基于 Next.js 和 Ant Design Pro 构建的管理后台系统。

## 功能特性

### 用户管理
- 用户登录/登出
- 用户信息管理
- 权限控制

### 分类管理
- 分类的增删改查
- 分类状态管理（启用/禁用）
- 分类排序
- 分类搜索
- 分类与产品关联

### 产品管理
- 产品列表展示
- 产品分类关联

## 技术栈

- **前端框架**: Next.js 14
- **UI 组件库**: Ant Design Pro
- **样式**: Tailwind CSS
- **状态管理**: React Hooks
- **HTTP 客户端**: Axios
- **类型检查**: TypeScript

## 开发环境

### 安装依赖
```bash
npm install
# 或
pnpm install
```

### 启动开发服务器
```bash
npm run dev
# 或
pnpm dev
```

### 构建生产版本
```bash
npm run build
# 或
pnpm build
```

## 项目结构

```
admin/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── categories/      # 分类管理页面
│   │   ├── products/        # 产品管理页面
│   │   ├── users/           # 用户管理页面
│   │   ├── dashboard/       # 仪表盘页面
│   │   ├── login/           # 登录页面
│   │   └── ClientLayout.tsx # 客户端布局组件
│   ├── services/            # API 服务
│   │   └── category.ts      # 分类管理 API
│   ├── lib/                 # 工具库
│   │   └── axios.ts         # HTTP 客户端配置
│   └── hooks/               # 自定义 Hooks
├── next.config.mjs          # Next.js 配置
└── package.json
```

## API 配置

项目配置了 API 代理，将 `/api/*` 请求转发到后端服务器 `http://localhost:3000`。

## 分类管理功能

### 主要功能
1. **分类列表**: 支持分页、搜索、筛选
2. **创建分类**: 包含名称、描述、图标、排序权重、状态
3. **编辑分类**: 修改分类信息
4. **删除分类**: 删除前检查是否有关联产品
5. **状态切换**: 快速启用/禁用分类
6. **排序管理**: 实时调整分类排序

### 数据字段
- `id`: 分类ID
- `name`: 分类名称（唯一）
- `description`: 分类描述
- `icon`: 分类图标
- `isActive`: 是否启用
- `sortOrder`: 排序权重
- `createdAt`: 创建时间
- `updatedAt`: 更新时间
- `products`: 关联的产品列表

## 使用说明

1. 启动后端服务器（确保运行在 localhost:3000）
2. 启动前端开发服务器
3. 访问 http://localhost:3001
4. 使用管理员账号登录
5. 在左侧菜单选择"分类管理"
6. 进行分类的增删改查操作

## 注意事项

- 确保后端服务器正在运行
- 分类名称具有唯一性
- 删除分类前会检查是否有关联产品
- 所有操作都有相应的成功/失败提示
