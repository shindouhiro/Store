import { AppDataSource } from './data-source';
import { seedProducts } from './products.seed';
import { seedUsers } from './user.seed';
import { messageSeed } from './message.seed';
import { categorySeed } from './category.seed';

async function main() {
  await AppDataSource.initialize();
  await categorySeed(AppDataSource);
  await seedProducts();
  await seedUsers();
  await messageSeed(AppDataSource);
  await AppDataSource.destroy();
  console.log('所有 seeds 执行完毕...22.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}); 
