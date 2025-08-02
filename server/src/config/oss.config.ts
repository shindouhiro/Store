import OSS from 'ali-oss';

// 創建 OSS 客戶端的工廠函數
export function createOssClient(): OSS {
  return new OSS({
    region: process.env.OSS_REGION || 'oss-cn-shanghai',
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    bucket: process.env.OSS_BUCKET || 'dulizha',
  });
}

// 導出默認的客戶端實例（延遲創建）
let ossClient: OSS | null = null;

export default function getOssClient(): OSS {
  if (!ossClient) {
    ossClient = createOssClient();
  }
  return ossClient;
} 
