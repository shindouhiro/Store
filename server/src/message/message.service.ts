import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  /**
   * 创建新留言
   */
  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create(createMessageDto);
    return await this.messageRepository.save(message);
  }

  /**
   * 获取留言列表（支持分页）
   */
  async findAll(page: number = 1, pageSize: number = 10): Promise<{
    data: Message[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const [data, total] = await this.messageRepository.findAndCount({
      order: { createdAt: 'DESC' },
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

  /**
   * 根据ID获取单个留言
   */
  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`留言ID ${id} 不存在`);
    }
    return message;
  }

  /**
   * 更新留言
   */
  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const message = await this.findOne(id);
    Object.assign(message, updateMessageDto);
    return await this.messageRepository.save(message);
  }

  /**
   * 删除留言
   */
  async remove(id: number): Promise<{ message: string }> {
    const message = await this.findOne(id);
    await this.messageRepository.remove(message);
    return { message: '留言删除成功' };
  }

  /**
   * 根据邮箱搜索留言
   */
  async findByEmail(email: string, page: number = 1, pageSize: number = 10): Promise<{
    data: Message[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const [data, total] = await this.messageRepository.findAndCount({
      where: { email },
      order: { createdAt: 'DESC' },
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

  /**
   * 根据产品兴趣搜索留言
   */
  async findByProductInterest(productInterest: string, page: number = 1, pageSize: number = 10): Promise<{
    data: Message[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const [data, total] = await this.messageRepository.findAndCount({
      where: { productInterest },
      order: { createdAt: 'DESC' },
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
} 
