import { Injectable } from '@nestjs/common';
import getOssClient from '../config/oss.config';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class OssService {
  async uploadOSS(objectName: string, localFilePath: string, headers?: Record<string, string>) {
    try {
      const client = getOssClient();
      console.log(client,'client')
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
      // 构造正确的OSS URL格式
      const bucket = client.options.bucket;
      const region = client.options.region;
      const url = `https://${bucket}.${region}.aliyuncs.com/${objectName}`;
      
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
