import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll(page: number = 1, pageSize: number = 10) {
    const [data, total] = await this.productsRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['category'], // 如果有分类关联
      order: { id: 'DESC' },   // 可选：按 id 倒序
    });

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
} 
