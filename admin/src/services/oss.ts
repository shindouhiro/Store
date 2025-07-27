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

// 上传视频到OSS
export async function uploadVideoToOSS(file: File): Promise<UploadResponse> {
  try {
    console.log('uploadVideoToOSS - 开始上传视频:', file.name);
    
    // 创建FormData
    const formData = new FormData();
    formData.append('file', file);
    
    // 生成唯一的文件名
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    const objectName = `videos/${timestamp}_${randomString}.${extension}`;
    
    console.log('uploadVideoToOSS - 生成的文件名:', objectName);
    
    // 上传视频到OSS
    const response = await request.post<{ data: { url: string; objectName: string } }>('/oss/upload-video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        objectName,
      },
    });
    
    console.log('uploadVideoToOSS - 服务器响应:', response.data);
    
    return {
      url: response.data.data.url,
      objectName: response.data.data.objectName,
    };
  } catch (error) {
    console.error('uploadVideoToOSS - 上传失败:', error);
    throw error;
  }
} 
