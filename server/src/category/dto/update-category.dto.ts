import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, MinLength, Min } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ description: '分类名称', required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @ApiProperty({ description: '分类描述', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: '分类图标', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ description: '是否启用', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: '排序权重', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number;
} 
