import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsArray, IsOptional, MinLength, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: '产品名称' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ description: '产品描述' })
  @IsString()
  @MinLength(1)
  description: string;

  @ApiProperty({ description: '价格' })
  @IsString()
  price: string;

  @ApiProperty({ description: '分类ID' })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ description: '图片URL' })
  @IsString()
  imageUrl: string;

  @ApiProperty({ description: '视频URL', required: false })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiProperty({ description: '产品特性', type: [String] })
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @ApiProperty({ description: '规格（JSON字符串）' })
  @IsString()
  specifications: string;

  @ApiProperty({ description: '是否有库存' })
  @IsBoolean()
  inStock: boolean;

  @ApiProperty({ description: '评分' })
  @IsString()
  rating: string;

  @ApiProperty({ description: '评论数' })
  @IsNumber()
  @Min(0)
  reviewCount: number;

  @ApiProperty({ description: '标签', type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];
} 
