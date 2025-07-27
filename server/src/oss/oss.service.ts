import { Injectable } from '@nestjs/common';
import client from '../common/ossClient';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class OssService {
  async uploadOSS(objectName: string, localFilePath: string, headers?: Record<string, string>) {
    try {
      // 检查OSS客户端是否可用
      if (!client) {
        throw new Error('OSS客户端未初始化，请检查环境变量配置');
      }

      const result = await client.put(objectName, path.normalize(localFilePath), { headers });
      
      // 上传成功后删除临时文件
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
      
      // 返回OSS URL
      const url = `https://${client.options.bucket}.${client.options.endpoint}/${objectName}`;
      
      return {
        data: {
          url,
          objectName,
          etag: result.etag,
        },
      };
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
