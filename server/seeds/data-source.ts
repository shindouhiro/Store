import { DataSource } from 'typeorm';
import { Product } from '../src/products/entities/product.entity';
import { Category } from '../src/category/entities/category.entity';
import { User } from '../src/user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'nest_demo',
  entities: [Product, Category, User],
  synchronize: process.env.NODE_ENV !== 'production',
}); 
