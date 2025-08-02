import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';
import { Message } from '../message/entities/message.entity';

// 基础数据库配置函数
const getBaseConfig = () => ({
  type: 'mysql' as const,
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'nest_demo',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  // 禁用 SSL 连接
  ssl: false,
  extra: {
    ssl: false,
  },
});

// NestJS TypeORM 配置函数
export const getTypeOrmConfig = (): TypeOrmModuleOptions => ({
  ...getBaseConfig(),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
});

// TypeORM DataSource 配置函数（用于 seeds）
export const getDataSourceConfig = (): DataSourceOptions => ({
  ...getBaseConfig(),
  entities: [Product, Category, User, Message],
}); 
