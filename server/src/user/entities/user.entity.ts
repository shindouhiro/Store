import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '用户ID' })
  id: number;

  @Column('varchar', { unique: true })
  @ApiProperty({ description: '用户名' })
  username: string;

  @Column('varchar')
  password: string;

  @Column('varchar', { nullable: true })
  @ApiProperty({ description: '昵称' })
  nickname: string;

  @Column('varchar', { nullable: true })
  @ApiProperty({ description: '邮箱' })
  email: string;

  @Column('varchar', { nullable: true })
  @ApiProperty({ description: '角色' })
  role: string;

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}
