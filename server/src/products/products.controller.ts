import { Controller, Get, Body, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@ApiTags('产品')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: '获取产品列表' })
  findAll() {
    return this.productsService.findAll();
  }

  @Post('/categories')
  @ApiOperation({ summary: '创建分类' })
  async createCategory(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.productsService.createCategory(dto);
  }
} 
