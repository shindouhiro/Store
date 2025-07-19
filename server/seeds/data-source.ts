import { DataSource } from 'typeorm';
import { Product } from '../src/products/entities/product.entity';
import { Category } from '../src/category/entities/category.entity';
import { User } from '../src/user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nest_demo',
  entities: [Product, Category, User],
}); 
