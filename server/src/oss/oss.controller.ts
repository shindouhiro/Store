import { Controller, Post, Body } from '@nestjs/common';
import { OssService } from './oss.service';

@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Post('upload')
  async upload(@Body() body: { objectName: string; localFilePath: string; headers?: Record<string, string> }) {
    return this.ossService.uploadOSS(body.objectName, body.localFilePath, body.headers);
  }
}
