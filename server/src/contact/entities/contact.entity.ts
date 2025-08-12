import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export type ContactType = 'location' | 'phone' | 'email' | 'social';

@Entity('contact_info')
export class ContactInfo {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '主键ID' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @ApiProperty({ description: '类型: location | phone | email | social' })
  type: ContactType;

  @Column({ type: 'varchar', length: 200 })
  @ApiProperty({ description: '标题' })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({ description: '图标标识（例如：MapPin、Phone、Mail、LinkedIn 等）', required: false })
  icon?: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @ApiProperty({ description: '背景渐变（例如：from-blue-500 to-purple-600）', required: false })
  gradient?: string | null;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: '详情 JSON：\n- 非 social: string[]\n- social: { icon: string; href: string; label: string }[]', required: false })
  detailsJson?: string | null;

  @Column({ type: 'boolean', default: true })
  @ApiProperty({ description: '是否启用' })
  isActive: boolean;

  @Column({ type: 'int', default: 0 })
  @ApiProperty({ description: '排序权重，越大越靠前' })
  sortOrder: number;

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}


