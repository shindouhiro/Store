# 留言 API 對接設置指南

## 概述

已成功將前端的聯繫表單對接到後端的 `/messages` POST 接口，實現了完整的留言提交功能。

## 修改內容

### 1. 前端修改 (ui/client/src/pages/contact.tsx)

- **API 接口變更**：從 `/api/inquiries` 改為 `/api/messages`
- **表單驗證優化**：只要求必填字段（姓名、郵箱、留言內容）
- **錯誤信息本地化**：所有提示信息改為中文
- **字段標記更新**：Company 和 Product Interest 改為可選
- **分類動態獲取**：產品興趣分類從 `/api/categories` 接口動態獲取

### 2. Schema 修改 (ui/shared/schema.ts)

- **字段可選性**：`company` 和 `productInterest` 改為可選字段
- **與後端 DTO 一致**：確保前後端數據結構匹配

### 3. 後端配置 (server/src/config/database.config.ts)

- **實體註冊**：添加 Message 實體到 DataSource 配置
- **遷移支持**：創建 ormconfig.ts 支持數據庫遷移

### 4. 分類功能 (server/seeds/category.seed.ts)

- **種子數據**：創建分類種子數據文件
- **動態分類**：支持從後端動態獲取分類列表

## 數據結構對比

### 前端表單數據
```typescript
{
  firstName: string;      // 必填
  lastName: string;       // 必填
  email: string;          // 必填
  company?: string;       // 可選
  productInterest?: string; // 可選
  message: string;        // 必填
}
```

### 後端 CreateMessageDto
```typescript
{
  firstName: string;      // 必填
  lastName: string;       // 必填
  email: string;          // 必填
  company?: string;       // 可選
  productInterest?: string; // 可選
  message: string;        // 必填
}
```

## 啟動步驟

### 1. 啟動後端服務
```bash
cd server
npm install
npm run dev
```

### 2. 運行數據庫遷移和種子數據
```bash
cd server
npm run seed
```

### 3. 啟動前端服務
```bash
cd ui
npm install
npm run dev
```

### 4. 測試 API
```bash
# 測試留言 API
node test-message-api.js

# 測試分類 API
node test-categories-api.js
```

## API 接口詳情

### GET /categories?active=true
**用途**：獲取啟用的分類列表

**響應**：
```json
[
  {
    "id": 1,
    "name": "运动鞋",
    "description": "各种运动鞋，包括跑步鞋、篮球鞋、足球鞋等",
    "icon": "🏃‍♂️",
    "isActive": true,
    "sortOrder": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### POST /messages
**用途**：創建新留言

**請求體**：
```json
{
  "firstName": "張",
  "lastName": "三",
  "email": "zhangsan@example.com",
  "company": "ABC公司",
  "productInterest": "運動鞋",
  "message": "對你們的產品很感興趣"
}
```

**響應**：
```json
{
  "id": 1,
  "firstName": "張",
  "lastName": "三",
  "email": "zhangsan@example.com",
  "company": "ABC公司",
  "productInterest": "運動鞋",
  "message": "對你們的產品很感興趣",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 代理配置

前端使用 Vite 代理將 `/api` 請求轉發到後端：

```javascript
// ui/vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

這意味著：
- 前端發送：`POST /api/messages`
- 實際請求：`POST http://localhost:3000/messages`

## 驗證步驟

### 1. 檢查後端服務
訪問 `http://localhost:3000/api-docs` 查看 Swagger 文檔

### 2. 測試前端表單
1. 訪問前端聯繫頁面
2. 檢查產品興趣下拉框是否顯示從後端獲取的分類
3. 填寫表單（只填必填字段）
4. 提交表單
5. 檢查是否顯示成功提示

### 3. 檢查管理後台
1. 訪問管理後台
2. 點擊「留言管理」
3. 查看是否有新提交的留言

## 常見問題

### 1. CORS 錯誤
確保後端已啟用 CORS：
```typescript
// server/src/main.ts
app.enableCors();
```

### 2. 數據庫連接錯誤
檢查 `.env` 文件中的數據庫配置：
```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=your_database
```

### 3. 實體元數據錯誤
確保 Message 實體已正確註冊：
```typescript
// server/src/config/database.config.ts
entities: [Product, Category, User, Message],
```

## 功能特性

- ✅ 完整的表單驗證
- ✅ 中文錯誤提示
- ✅ 可選字段支持
- ✅ 實時響應反饋
- ✅ 管理後台集成
- ✅ API 文檔支持
- ✅ 動態分類獲取
- ✅ 分類緩存優化

## 擴展建議

1. **郵件通知**：提交留言後發送確認郵件
2. **狀態管理**：添加留言狀態（已讀/未讀）
3. **回覆功能**：管理員可以回覆留言
4. **導出功能**：支持留言數據導出
5. **統計圖表**：留言數據可視化 
