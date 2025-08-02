# 留言管理功能設置指南

## 功能概述

已成功創建留言管理功能，使用 Ant Design Pro Table 展示 message 實體的所有字段，並調用 `/messages` 接口。

## 已創建的文件

### 前端文件
1. **`admin/src/services/message.ts`** - 留言相關 API 服務
2. **`admin/src/app/messages/page.tsx`** - 留言管理頁面組件
3. **`admin/src/app/messages/README.md`** - 功能說明文檔
4. **`admin/src/app/ClientLayout.tsx`** - 已添加留言管理菜單項

### 後端文件（已存在）
1. **`server/src/message/entities/message.entity.ts`** - 留言實體
2. **`server/src/message/message.controller.ts`** - 留言控制器
3. **`server/src/message/message.service.ts`** - 留言服務
4. **`server/src/message/message.module.ts`** - 留言模組
5. **`server/src/database/migrations/1700000000000-CreateMessagesTable.ts`** - 數據庫遷移
6. **`server/seeds/message.seed.ts`** - 種子數據

## 功能特性

### 1. 完整的留言展示
- 顯示所有 message 實體字段：
  - ID
  - 姓名（firstName + lastName）
  - 郵箱地址（支持複製）
  - 公司名稱（可選）
  - 產品興趣（可選）
  - 留言內容（支持省略顯示）
  - 創建時間
  - 更新時間

### 2. 搜索功能
- 支持按姓名、郵箱、公司、產品興趣搜索
- 實時搜索結果更新

### 3. 操作功能
- **查看詳情**：彈窗顯示完整留言信息
- **刪除留言**：帶確認提示的安全刪除
- **批量選擇**：支持多選操作

### 4. 用戶體驗優化
- 響應式表格設計
- 時間格式化顯示
- 郵箱地址一鍵複製
- 留言內容省略顯示和完整查看

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

### 3. 啟動前端管理後台
```bash
cd admin
npm install
npm run dev
```

### 4. 訪問留言管理頁面
1. 打開瀏覽器訪問 `http://localhost:3000`
2. 登錄管理後台
3. 在左側菜單中點擊「留言管理」

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

## 技術實現

- **前端**：Next.js 14 + React 18 + TypeScript
- **UI 組件**：Ant Design 5 + Pro Components
- **HTTP 客戶端**：Axios
- **後端**：NestJS + TypeORM + MySQL
- **API 文檔**：Swagger

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

## 使用說明

1. **查看留言列表**：頁面會自動加載所有留言數據
2. **搜索留言**：使用頂部的搜索框進行條件搜索
3. **查看詳情**：點擊「查看」按鈕查看完整留言信息
4. **刪除留言**：點擊「刪除」按鈕，確認後刪除留言
5. **批量操作**：勾選多個留言進行批量操作

## 注意事項

1. 確保數據庫已正確配置並運行
2. 確保後端 API 服務正常運行
3. 確保前端能正確訪問後端 API
4. 如需添加更多功能，可以擴展 message 服務和頁面組件

## 擴展建議

1. **添加留言回覆功能**
2. **添加留言狀態管理（已讀/未讀）**
3. **添加留言導出功能**
4. **添加留言統計圖表**
5. **添加郵件通知功能** 
