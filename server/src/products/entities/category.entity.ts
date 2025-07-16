import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '分类ID' })
  id: number;

  @Column('varchar', { unique: true })
  @ApiProperty({ description: '分类名称' })
  name: string;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
} 
