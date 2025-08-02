import { DataSource } from 'typeorm';
import { Category } from '../src/category/entities/category.entity';

export const categorySeed = async (dataSource: DataSource) => {
  const categoryRepository = dataSource.getRepository(Category);

  // 检查是否已有数据
  const existingCategories = await categoryRepository.count();
  if (existingCategories > 0) {
    console.log('分类数据已存在，跳过种子数据创建');
    return;
  }

  const categories = [
    {
      name: '运动鞋',
      description: '各种运动鞋，包括跑步鞋、篮球鞋、足球鞋等',
      icon: '🏃‍♂️',
      isActive: true,
      sortOrder: 1,
    },
    {
      name: '休闲鞋',
      description: '日常休闲穿着的舒适鞋子',
      icon: '👟',
      isActive: true,
      sortOrder: 2,
    },
    {
      name: '正装鞋',
      description: '商务场合穿着的正式鞋子',
      icon: '👞',
      isActive: true,
      sortOrder: 3,
    },
    {
      name: '凉鞋',
      description: '夏季穿着的凉鞋和拖鞋',
      icon: '🩴',
      isActive: true,
      sortOrder: 4,
    },
    {
      name: '靴子',
      description: '各种款式的靴子',
      icon: '👢',
      isActive: true,
      sortOrder: 5,
    },
  ];

  for (const categoryData of categories) {
    const category = categoryRepository.create(categoryData);
    await categoryRepository.save(category);
  }

  console.log(`成功创建 ${categories.length} 个分类种子数据`);
}; 
