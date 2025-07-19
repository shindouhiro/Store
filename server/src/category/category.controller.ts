import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('分类管理')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: '创建新分类' })
  @ApiResponse({ status: 201, description: '成功创建分类' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 409, description: '分类名称已存在' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有分类' })
  @ApiQuery({ name: 'page', required: false, description: '页码', type: Number })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量', type: Number })
  @ApiQuery({ name: 'active', required: false, description: '是否只获取启用的分类', type: Boolean })
  @ApiResponse({ status: 200, description: '成功获取分类列表' })
  findAll(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('active') active?: boolean,
  ) {
    if (page && pageSize) {
      return this.categoryService.findAllPaginated(Number(page), Number(pageSize));
    }
    if (active === true) {
      return this.categoryService.findActive();
    }
    return this.categoryService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: '搜索分类' })
  @ApiQuery({ name: 'keyword', required: true, description: '搜索关键词' })
  @ApiResponse({ status: 200, description: '成功搜索分类' })
  search(@Query('keyword') keyword: string) {
    return this.categoryService.search(keyword);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个分类详情' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiResponse({ status: 200, description: '成功获取分类详情' })
  @ApiResponse({ status: 404, description: '分类不存在' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新分类信息' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiResponse({ status: 200, description: '成功更新分类' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '分类不存在' })
  @ApiResponse({ status: 409, description: '分类名称已存在' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除分类' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiResponse({ status: 200, description: '成功删除分类' })
  @ApiResponse({ status: 404, description: '分类不存在' })
  @ApiResponse({ status: 409, description: '分类下还有产品，无法删除' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }

  @Put(':id/toggle')
  @ApiOperation({ summary: '切换分类启用状态' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiResponse({ status: 200, description: '成功切换分类状态' })
  @ApiResponse({ status: 404, description: '分类不存在' })
  toggleActive(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.toggleActive(id);
  }

  @Put(':id/sort')
  @ApiOperation({ summary: '更新分类排序' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiQuery({ name: 'sortOrder', required: true, description: '排序权重', type: Number })
  @ApiResponse({ status: 200, description: '成功更新分类排序' })
  @ApiResponse({ status: 404, description: '分类不存在' })
  updateSortOrder(
    @Param('id', ParseIntPipe) id: number,
    @Query('sortOrder', ParseIntPipe) sortOrder: number,
  ) {
    return this.categoryService.updateSortOrder(id, sortOrder);
  }
} 
