import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('产品')
@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: '获取产品列表' })
  @ApiQuery({ name: 'page', required: false, description: '页码', type: Number })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量', type: Number })
  @ApiResponse({ status: 200, description: '成功获取产品列表' })
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.productsService.findAll(Number(page), Number(pageSize));
  }

  @Get('search')
  @ApiOperation({ summary: '搜索产品' })
  @ApiQuery({ name: 'keyword', required: true, description: '搜索关键词' })
  @ApiQuery({ name: 'page', required: false, description: '页码', type: Number })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量', type: Number })
  @ApiResponse({ status: 200, description: '成功搜索产品' })
  search(
    @Query('keyword') keyword: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.productsService.search(keyword, Number(page), Number(pageSize));
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: '根据分类获取产品' })
  @ApiParam({ name: 'categoryId', description: '分类ID' })
  @ApiQuery({ name: 'page', required: false, description: '页码', type: Number })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量', type: Number })
  @ApiResponse({ status: 200, description: '成功获取分类产品' })
  findByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.productsService.findByCategory(categoryId, Number(page), Number(pageSize));
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个产品详情' })
  @ApiParam({ name: 'id', description: '产品ID' })
  @ApiResponse({ status: 200, description: '成功获取产品详情' })
  @ApiResponse({ status: 404, description: '产品不存在' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '创建新产品' })
  @ApiResponse({ status: 201, description: '成功创建产品' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '分类不存在' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新产品信息' })
  @ApiParam({ name: 'id', description: '产品ID' })
  @ApiResponse({ status: 200, description: '成功更新产品' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '产品或分类不存在' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除产品' })
  @ApiParam({ name: 'id', description: '产品ID' })
  @ApiResponse({ status: 200, description: '成功删除产品' })
  @ApiResponse({ status: 404, description: '产品不存在' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
} 
