import { AppDataSource } from './data-source';
import { seedProducts } from './products.seed';
import { seedUsers } from './user.seed';

async function main() {
  console.log('开始执行数据库种子');
  await AppDataSource.initialize();
  await seedProducts();
  await seedUsers();
  await AppDataSource.destroy();
  console.log('所有 seeds 执行完毕');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}); 
