import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { OssService } from './oss.service';
import * as fs from 'fs';

@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/temp',
        filename: (req, file, cb) => {
          const randomName = uuidv4();
          const extension = extname(file.originalname);
          cb(null, `${randomName}${extension}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new BadRequestException('只允许上传图片文件'), false);
        }
        cb(null, true);
      },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File, @Body() body: { objectName?: string }) {
    if (!file) {
      throw new BadRequestException('没有上传文件');
    }

    try {
      // 如果没有指定objectName，则自动生成
      const objectName = body.objectName || `products/${Date.now()}_${uuidv4()}${extname(file.originalname)}`;
      
      // 上传到OSS
      const result = await this.ossService.uploadOSS(objectName, file.path, {
        'Content-Type': file.mimetype,
      });

      // 删除临时文件
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      return result;
    } catch (error) {
      // 确保删除临时文件
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      throw error;
    }
  }

  @Post('upload-video')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/temp',
        filename: (req, file, cb) => {
          const randomName = uuidv4();
          const extension = extname(file.originalname);
          cb(null, `${randomName}${extension}`);
        },
      }),
      limits: {
        fileSize: 100 * 1024 * 1024, // 100MB for videos
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(mp4|avi|mov|wmv|flv|webm|mkv)$/)) {
          return cb(new BadRequestException('只允许上传视频文件 (mp4, avi, mov, wmv, flv, webm, mkv)'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadVideo(@UploadedFile() file: Express.Multer.File, @Body() body: { objectName?: string }) {
    if (!file) {
      throw new BadRequestException('没有上传文件');
    }

    try {
      // 如果没有指定objectName，则自动生成
      const objectName = body.objectName || `videos/${Date.now()}_${uuidv4()}${extname(file.originalname)}`;
      
      // 上传到OSS
      const result = await this.ossService.uploadOSS(objectName, file.path, {
        'Content-Type': file.mimetype,
      });

      // 删除临时文件
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      return result;
    } catch (error) {
      // 确保删除临时文件
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      throw error;
    }
  }
}
