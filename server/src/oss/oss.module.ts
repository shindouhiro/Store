import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { OssService } from './oss.service';
import { OssController } from './oss.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/temp',
      limits: {
        fileSize: 5 * 1024 * 1024 * 1024, // 限制文件大小为5GB
      },
    }),
  ],
  controllers: [OssController],
  providers: [OssService],
})
export class OssModule {}
