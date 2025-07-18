import { AppDataSource } from './data-source';
import { seedProducts } from './products.seed';
import { seedUsers } from './user.seed';

async function main() {
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
