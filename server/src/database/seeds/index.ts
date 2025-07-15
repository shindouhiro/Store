import { DataSource } from 'typeorm';
import { userSeed } from './user.seed';

export const runSeeds = async (dataSource: DataSource) => {
  try {
    console.log('开始执行数据库种子...');
    
    // 运行用户种子数据
    await userSeed(dataSource);
    
    console.log('数据库种子执行完成！');
  } catch (error) {
    console.error('执行数据库种子时出错:', error);
    throw error;
  }
}; 
