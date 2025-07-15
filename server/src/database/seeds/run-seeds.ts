import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from '../../user/entities/user.entity';
import { runSeeds } from './index';

// 创建数据源
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'nest_demo',
  entities: [User],
  synchronize: true,
});

// 运行种子
dataSource.initialize()
  .then(async () => {
    await runSeeds(dataSource);
    await dataSource.destroy();
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  }); 
