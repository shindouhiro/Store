import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '留言ID' })
  id: number;

  @Column('varchar', { length: 100 })
  @ApiProperty({ description: '名字' })
  firstName: string;

  @Column('varchar', { length: 100 })
  @ApiProperty({ description: '姓氏' })
  lastName: string;

  @Column('varchar', { length: 255 })
  @ApiProperty({ description: '邮箱地址' })
  email: string;

  @Column('varchar', { length: 255, nullable: true })
  @ApiProperty({ description: '公司名称', required: false })
  company: string;

  @Column('varchar', { length: 255, nullable: true })
  @ApiProperty({ description: '产品兴趣', required: false })
  productInterest: string;

  @Column('text')
  @ApiProperty({ description: '留言内容' })
  message: string;

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
} 
