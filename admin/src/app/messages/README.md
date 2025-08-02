# 留言管理功能

## 功能概述

留言管理頁面提供了完整的留言數據管理功能，包括查看、搜索、刪除等操作。

## 功能特性

### 1. 留言列表展示
- 使用 Ant Design Pro Table 展示所有留言數據
- 支持分頁顯示
- 顯示所有 message 實體字段：
  - ID
  - 姓名（firstName + lastName）
  - 郵箱地址
  - 公司名稱（可選）
  - 產品興趣（可選）
  - 留言內容
  - 創建時間
  - 更新時間

### 2. 搜索功能
- 支持按姓名搜索
- 支持按郵箱搜索
- 支持按公司名稱搜索
- 支持按產品興趣搜索

### 3. 操作功能
- **查看詳情**：點擊查看按鈕可以查看完整的留言信息
- **刪除留言**：支持單條留言刪除，帶確認提示
- **批量選擇**：支持多選操作

### 4. 數據展示優化
- 郵箱地址支持複製功能
- 留言內容支持省略顯示和完整查看
- 時間格式化顯示
- 響應式表格設計

## API 接口

### 獲取留言列表
```
GET /api/messages?page=1&pageSize=10&firstName=xxx&email=xxx&company=xxx&productInterest=xxx
```

### 獲取單個留言
```
GET /api/messages/:id
```

### 刪除留言
```
DELETE /api/messages/:id
```

## 文件結構

```
admin/src/app/messages/
├── page.tsx          # 留言管理頁面組件
└── README.md         # 功能說明文檔

admin/src/services/
└── message.ts        # 留言相關 API 服務
```

## 使用說明

1. 在管理後台左側菜單中點擊「留言管理」
2. 頁面會顯示所有留言列表
3. 可以使用搜索框進行條件搜索
4. 點擊「查看」按鈕查看留言詳情
5. 點擊「刪除」按鈕刪除留言（需要確認）

## 技術實現

- **前端框架**：Next.js 14 + React 18
- **UI 組件庫**：Ant Design 5 + Pro Components
- **狀態管理**：React Hooks
- **HTTP 客戶端**：Axios
- **類型檢查**：TypeScript

## 數據模型

```typescript
interface Message {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  productInterest?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
``` 
