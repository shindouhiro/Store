import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('分类')
@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: '创建分类' })
  create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有分类（分页）' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: '页码（默认1）' })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: '每页数量（默认10）' })
  findAll(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ) {
    return this.categoryService.findAllPaginated(Number(page), Number(pageSize));
  }
} 
