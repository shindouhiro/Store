import { DataSource } from 'typeorm';
import { getDataSourceConfig } from './src/config/database.config';

export default new DataSource(getDataSourceConfig()); 
