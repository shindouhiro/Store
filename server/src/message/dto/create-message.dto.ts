import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ description: '名字', example: '张' })
  @IsString()
  @IsNotEmpty({ message: '名字不能为空' })
  @MaxLength(100, { message: '名字长度不能超过100个字符' })
  firstName: string;

  @ApiProperty({ description: '姓氏', example: '三' })
  @IsString()
  @IsNotEmpty({ message: '姓氏不能为空' })
  @MaxLength(100, { message: '姓氏长度不能超过100个字符' })
  lastName: string;

  @ApiProperty({ description: '邮箱地址', example: 'zhangsan@example.com' })
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  @IsNotEmpty({ message: '邮箱地址不能为空' })
  email: string;

  @ApiProperty({ description: '公司名称', required: false, example: 'ABC公司' })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: '公司名称长度不能超过255个字符' })
  company?: string;

  @ApiProperty({ description: '产品兴趣', required: false, example: '电子产品' })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: '产品兴趣长度不能超过255个字符' })
  productInterest?: string;

  @ApiProperty({ description: '留言内容', example: '我对你们的产品很感兴趣，希望能了解更多信息。' })
  @IsString()
  @IsNotEmpty({ message: '留言内容不能为空' })
  message: string;
} 
