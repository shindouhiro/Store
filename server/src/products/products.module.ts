import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), CategoryModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {} 
