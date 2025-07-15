import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '用户ID' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: '用户名' })
  username: string;

  @Column({ unique: true })
  @ApiProperty({ description: '邮箱' })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '昵称' })
  nickname: string;

  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  @ApiProperty({ description: '用户角色' })
  role: 'admin' | 'user';

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}
