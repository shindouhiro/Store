import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength, Min } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ description: '类型: location | phone | email | social' })
  @IsString()
  @IsIn(['location', 'phone', 'email', 'social'])
  type: 'location' | 'phone' | 'email' | 'social';

  @ApiProperty({ description: '标题' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  title: string;

  @ApiProperty({ description: '图标标识（如 MapPin、Phone、Mail、LinkedIn 等）', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  icon?: string;

  @ApiProperty({ description: '背景渐变（如: from-blue-500 to-purple-600）', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  gradient?: string;

  @ApiProperty({ description: '详情 JSON 字符串：\n- 非 social: string[]\n- social: { icon: string; href: string; label: string }[]', required: false })
  @IsOptional()
  @IsString()
  detailsJson?: string;

  @ApiProperty({ description: '是否启用', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @ApiProperty({ description: '排序权重，越大越靠前', default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number = 0;
}


