import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll(): Partial<Product>[] {
    return [
      {
        name: "Pro Runner X1",
        description: "Advanced running technology with premium cushioning and breathable mesh upper designed for professional athletes.",
        price: "89.99",
        category: { name: "athletic" } as any,
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
      }
    ];
  }

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }
} 
