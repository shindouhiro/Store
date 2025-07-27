import { Injectable } from '@nestjs/common';
import client from '../common/ossClient';
import * as path from 'path';

@Injectable()
export class OssService {
  async uploadOSS(objectName: string, localFilePath: string, headers?: Record<string, string>) {
    try {
      const result = await client.put(objectName, path.normalize(localFilePath), { headers });
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
