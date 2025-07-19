import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsArray, IsOptional, MinLength, Min } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ description: '产品名称', required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @ApiProperty({ description: '产品描述', required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string;

  @ApiProperty({ description: '价格', required: false })
  @IsOptional()
  @IsString()
  price?: string;

  @ApiProperty({ description: '分类ID', required: false })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiProperty({ description: '图片URL', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ description: '产品特性', type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiProperty({ description: '规格（JSON字符串）', required: false })
  @IsOptional()
  @IsString()
  specifications?: string;

  @ApiProperty({ description: '是否有库存', required: false })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @ApiProperty({ description: '评分', required: false })
  @IsOptional()
  @IsString()
  rating?: string;

  @ApiProperty({ description: '评论数', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  reviewCount?: number;

  @ApiProperty({ description: '标签', type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
} 
