import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

interface CategoryFilterOptions {
  name?: string;
  isActive?: boolean;
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    // 检查分类名称是否已存在
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new ConflictException(`分类名称 "${createCategoryDto.name}" 已存在`);
    }

    const category = this.categoryRepository.create({
      ...createCategoryDto,
      isActive: createCategoryDto.isActive ?? true,
      sortOrder: createCategoryDto.sortOrder ?? 0,
    });

    return this.categoryRepository.save(category);
  }

  async findAll(filters?: CategoryFilterOptions): Promise<Category[]> {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');

    if (filters?.name) {
      queryBuilder.andWhere('category.name LIKE :name', { name: `%${filters.name}%` });
    }

    if (filters?.isActive !== undefined) {
      queryBuilder.andWhere('category.isActive = :isActive', { isActive: filters.isActive });
    }

    return queryBuilder
      .orderBy('category.sortOrder', 'ASC')
      .addOrderBy('category.id', 'ASC')
      .getMany();
  }

  async findAllPaginated(page = 1, pageSize = 10, filters?: CategoryFilterOptions) {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');

    if (filters?.name) {
      queryBuilder.andWhere('category.name LIKE :name', { name: `%${filters.name}%` });
    }

    if (filters?.isActive !== undefined) {
      queryBuilder.andWhere('category.isActive = :isActive', { isActive: filters.isActive });
    }

    const [data, total] = await queryBuilder
      .orderBy('category.sortOrder', 'ASC')
      .addOrderBy('category.id', 'ASC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findActive(): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { isActive: true },
      order: { sortOrder: 'ASC', id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException(`分类ID ${id} 不存在`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);

    // 如果要更新名称，检查新名称是否与其他分类冲突
    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: updateCategoryDto.name },
      });

      if (existingCategory) {
        throw new ConflictException(`分类名称 "${updateCategoryDto.name}" 已存在`);
      }
    }

    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);

    // 检查分类下是否有产品
    const productCount = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.products', 'product')
      .where('category.id = :id', { id })
      .getCount();

    if (productCount > 0) {
      throw new ConflictException(`无法删除分类，该分类下还有 ${productCount} 个产品`);
    }

    await this.categoryRepository.remove(category);
  }

  async toggleActive(id: number): Promise<Category> {
    const category = await this.findOne(id);
    category.isActive = !category.isActive;
    return this.categoryRepository.save(category);
  }

  async updateSortOrder(id: number, sortOrder: number): Promise<Category> {
    const category = await this.findOne(id);
    category.sortOrder = sortOrder;
    return this.categoryRepository.save(category);
  }

  async search(keyword: string): Promise<Category[]> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('category.name LIKE :keyword OR category.description LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
      .orderBy('category.sortOrder', 'ASC')
      .addOrderBy('category.id', 'ASC')
      .getMany();
  }
} 
