import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactInfo)
    private readonly contactRepository: Repository<ContactInfo>,
  ) {}

  async create(dto: CreateContactDto): Promise<ContactInfo> {
    const entity = this.contactRepository.create(dto);
    return this.contactRepository.save(entity);
  }

  async findAll(page = 1, pageSize = 10): Promise<{ data: ContactInfo[]; total: number; page: number; pageSize: number; totalPages: number; }> {
    const [data, total] = await this.contactRepository.findAndCount({
      order: { sortOrder: 'DESC', id: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findPublic(): Promise<ContactInfo[]> {
    return this.contactRepository.find({
      where: { isActive: true },
      order: { sortOrder: 'DESC', id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ContactInfo> {
    const entity = await this.contactRepository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('联系信息不存在');
    return entity;
  }

  async update(id: number, dto: UpdateContactDto): Promise<ContactInfo> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.contactRepository.save(entity);
  }

  async remove(id: number): Promise<{ message: string }> {
    const entity = await this.findOne(id);
    await this.contactRepository.remove(entity);
    return { message: '删除成功' };
  }
}


