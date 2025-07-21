import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '分类ID' })
  id: number;

  @Column('varchar', { unique: true })
  @ApiProperty({ description: '分类名称' })
  name: string;

  @Column('text', { nullable: true })
  @ApiProperty({ description: '分类描述' })
  description: string;

  @Column('varchar', { nullable: true })
  @ApiProperty({ description: '分类图标' })
  icon: string;

  @Column('boolean', { default: true })
  @ApiProperty({ description: '是否启用' })
  isActive: boolean;

  @Column('int', { default: 0 })
  @ApiProperty({ description: '排序权重' })
  sortOrder: number;

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;

  @OneToMany('Product', 'category')
  products: any[];
} 
 