import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe());

  // 配置 Swagger
  const config = new DocumentBuilder()
    .setTitle('API 文档')
    .setDescription('NestJS API 接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // 启用 CORS
  app.enableCors();

  await app.listen(3000);
  console.log('应用已启动: http://localhost:3000');
  console.log('Swagger 文档: http://localhost:3000/api-docs');
}

bootstrap(); 
