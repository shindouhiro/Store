import { AppDataSource } from './data-source';
import { Product } from '../src/products/entities/product.entity';
import { Category } from '../src/category/entities/category.entity';

export async function seedProducts() {
  const categoryRepo = AppDataSource.getRepository(Category);
  const productRepo = AppDataSource.getRepository(Product);

  // 创建分类
  let athletic = await categoryRepo.findOneBy({ name: 'athletic' });
  if (!athletic) {
    athletic = categoryRepo.create({ name: 'athletic' });
    await categoryRepo.save(athletic);
  }

  // 创建产品
  const product = productRepo.create({
    name: "Pro Runner X1",
    description: "Advanced running technology with premium cushioning and breathable mesh upper designed for professional athletes.",
    price: "89.99",
    category: athletic,
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    features: ["Advanced Cushioning", "Breathable Mesh", "Lightweight Design", "Professional Grade"],
    specifications: JSON.stringify({
      material: "Premium Mesh & Synthetic",
      soleType: "Advanced Cushioning System",
      weight: "280g (Size 9)",
      availableSizes: "US 6-13"
    }),
    inStock: true,
    rating: "4.8",
    reviewCount: 2341,
    tags: ["running", "professional", "lightweight"]
  });
  await productRepo.save(product);

  console.log('Products seeded');
}
