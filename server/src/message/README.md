# 留言管理模块

这个模块提供了完整的留言管理功能，包括创建、查询、更新和删除留言。

## 功能特性

- ✅ 创建新留言
- ✅ 获取留言列表（支持分页）
- ✅ 根据ID获取单个留言
- ✅ 更新留言信息
- ✅ 删除留言
- ✅ 根据邮箱搜索留言
- ✅ 根据产品兴趣搜索留言
- ✅ 数据验证
- ✅ Swagger API 文档

## API 接口

### 1. 创建留言
```
POST /messages
```

**请求体：**
```json
{
  "firstName": "张",
  "lastName": "三",
  "email": "zhangsan@example.com",
  "company": "ABC科技有限公司",
  "productInterest": "电子产品",
  "message": "我对你们的产品很感兴趣，希望能了解更多信息。"
}
```

### 2. 获取留言列表
```
GET /messages?page=1&pageSize=10
```

**响应：**
```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "pageSize": 10,
  "totalPages": 10
}
```

### 3. 获取单个留言
```
GET /messages/:id
```

### 4. 更新留言
```
PUT /messages/:id
```

### 5. 删除留言
```
DELETE /messages/:id
```

### 6. 根据邮箱搜索留言
```
GET /messages/search/email?email=zhangsan@example.com&page=1&pageSize=10
```

### 7. 根据产品兴趣搜索留言
```
GET /messages/search/product-interest?productInterest=电子产品&page=1&pageSize=10
```

## 数据库表结构

```sql
CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  productInterest VARCHAR(255),
  message TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 数据验证规则

- `firstName`: 必填，最大长度100字符
- `lastName`: 必填，最大长度100字符
- `email`: 必填，必须是有效的邮箱格式
- `company`: 可选，最大长度255字符
- `productInterest`: 可选，最大长度255字符
- `message`: 必填，文本内容

## 使用示例

### 前端调用示例

```javascript
// 创建留言
const createMessage = async (messageData) => {
  const response = await fetch('/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  });
  return response.json();
};

// 获取留言列表
const getMessages = async (page = 1, pageSize = 10) => {
  const response = await fetch(`/messages?page=${page}&pageSize=${pageSize}`);
  return response.json();
};

// 搜索留言
const searchMessagesByEmail = async (email, page = 1, pageSize = 10) => {
  const response = await fetch(`/messages/search/email?email=${email}&page=${page}&pageSize=${pageSize}`);
  return response.json();
};
```

## 部署说明

1. 确保数据库连接正常
2. 运行数据库迁移：`npm run migration:run`
3. 运行种子数据：`npm run seed`
4. 重启服务：`npm run start:prod`

## 注意事项

- 所有时间字段使用 UTC 时间
- 邮箱地址会自动验证格式
- 分页参数默认为 page=1, pageSize=10
- 删除操作不可恢复，请谨慎操作 
