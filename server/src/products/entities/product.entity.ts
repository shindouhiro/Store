import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '产品ID' })
  id: number;

  @Column('varchar')
  @ApiProperty({ description: '产品名称' })
  name: string;

  @Column('text')
  @ApiProperty({ description: '产品描述' })
  description: string;

  @Column('varchar')
  @ApiProperty({ description: '价格' })
  price: string;

  @ManyToOne('Category', 'products', { eager: true })
  @ApiProperty({ description: '分类' })
  category: any;

  @Column('varchar')
  @ApiProperty({ description: '图片URL' })
  imageUrl: string;

  @Column('simple-array')
  @ApiProperty({ description: '产品特性', type: [String] })
  features: string[];

  @Column('text')
  @ApiProperty({ description: '规格（JSON字符串）' })
  specifications: string;

  @Column('boolean', { default: true })
  @ApiProperty({ description: '是否有库存' })
  inStock: boolean;

  @Column('varchar')
  @ApiProperty({ description: '评分' })
  rating: string;

  @Column('int')
  @ApiProperty({ description: '评论数' })
  reviewCount: number;

  @Column('simple-array')
  @ApiProperty({ description: '标签', type: [String] })
  tags: string[];
} 
