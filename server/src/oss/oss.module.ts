import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { OssService } from './oss.service';
import { OssController } from './oss.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/temp',
    }),
  ],
  controllers: [OssController],
  providers: [OssService],
})
export class OssModule {}
