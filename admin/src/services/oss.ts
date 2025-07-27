import { request } from '@/lib/axios';

export interface UploadResponse {
  url: string;
  objectName: string;
}

// 上传文件到OSS
export async function uploadToOSS(file: File): Promise<UploadResponse> {
  // 创建FormData
  const formData = new FormData();
  formData.append('file', file);
  
  // 生成唯一的文件名
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = file.name.split('.').pop();
  const objectName = `products/${timestamp}_${randomString}.${extension}`;
  
  // 直接上传到OSS
  const response = await request.post<{ data: { url: string; objectName: string } }>('/oss/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      objectName,
    },
  });
  
  return {
    url: response.data.data.url,
    objectName: response.data.data.objectName,
  };
}

// 批量上传文件到OSS
export async function uploadMultipleToOSS(files: File[]): Promise<UploadResponse[]> {
  const uploadPromises = files.map(file => uploadToOSS(file));
  return Promise.all(uploadPromises);
} 
