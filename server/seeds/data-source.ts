import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { getDataSourceConfig } from '../src/config/database.config';

// 加载环境变量
dotenv.config({ path: '.env' });

export const AppDataSource = new DataSource(getDataSourceConfig()); 
