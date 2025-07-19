# 分类管理 API

## 概述
分类管理模块提供了完整的分类CRUD操作，包括创建、查询、更新、删除等功能。

## API 接口

### 1. 创建分类
- **POST** `/api/categories`
- **描述**: 创建新分类
- **请求体**:
```json
{
  "name": "电子产品",
  "description": "各类电子产品",
  "icon": "icon-electronics",
  "isActive": true,
  "sortOrder": 1
}
```

### 2. 获取分类列表
- **GET** `/api/categories`
- **描述**: 获取所有分类
- **查询参数**:
  - `page`: 页码（可选）
  - `pageSize`: 每页数量（可选）
  - `active`: 是否只获取启用的分类（可选）

### 3. 搜索分类
- **GET** `/api/categories/search?keyword=关键词`
- **描述**: 根据关键词搜索分类

### 4. 获取单个分类
- **GET** `/api/categories/:id`
- **描述**: 获取指定分类详情

### 5. 更新分类
- **PUT** `/api/categories/:id`
- **描述**: 更新分类信息
- **请求体**: 同创建分类，所有字段可选

### 6. 删除分类
- **DELETE** `/api/categories/:id`
- **描述**: 删除分类（如果分类下有产品则无法删除）

### 7. 切换分类状态
- **PUT** `/api/categories/:id/toggle`
- **描述**: 切换分类的启用/禁用状态

### 8. 更新分类排序
- **PUT** `/api/categories/:id/sort?sortOrder=1`
- **描述**: 更新分类的排序权重

## 数据模型

### Category 实体
```typescript
{
  id: number;           // 分类ID
  name: string;         // 分类名称（唯一）
  description: string;  // 分类描述
  icon: string;         // 分类图标
  isActive: boolean;    // 是否启用
  sortOrder: number;    // 排序权重
  createdAt: Date;      // 创建时间
  updatedAt: Date;      // 更新时间
  products: Product[];  // 关联的产品列表
}
```

## 错误处理
- `400`: 请求参数错误
- `404`: 分类不存在
- `409`: 分类名称已存在或分类下还有产品无法删除

## 特性
- 分类名称唯一性验证
- 删除前检查是否有关联产品
- 支持分页查询
- 支持搜索功能
- 支持排序和状态管理 
