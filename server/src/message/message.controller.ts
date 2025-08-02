import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@ApiTags('留言管理')
@Controller('/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: '创建新留言' })
  @ApiResponse({ status: 201, description: '成功创建留言' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  @ApiOperation({ summary: '获取留言列表' })
  @ApiQuery({ name: 'page', required: false, description: '页码', type: Number })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量', type: Number })
  @ApiResponse({ status: 200, description: '成功获取留言列表' })
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.messageService.findAll(Number(page), Number(pageSize));
  }

  @Get('search/email')
  @ApiOperation({ summary: '根据邮箱搜索留言' })
  @ApiQuery({ name: 'email', required: true, description: '邮箱地址' })
  @ApiQuery({ name: 'page', required: false, description: '页码', type: Number })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量', type: Number })
  @ApiResponse({ status: 200, description: '成功搜索留言' })
  findByEmail(
    @Query('email') email: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.messageService.findByEmail(email, Number(page), Number(pageSize));
  }

  @Get('search/product-interest')
  @ApiOperation({ summary: '根据产品兴趣搜索留言' })
  @ApiQuery({ name: 'productInterest', required: true, description: '产品兴趣' })
  @ApiQuery({ name: 'page', required: false, description: '页码', type: Number })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量', type: Number })
  @ApiResponse({ status: 200, description: '成功搜索留言' })
  findByProductInterest(
    @Query('productInterest') productInterest: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.messageService.findByProductInterest(productInterest, Number(page), Number(pageSize));
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个留言详情' })
  @ApiParam({ name: 'id', description: '留言ID' })
  @ApiResponse({ status: 200, description: '成功获取留言详情' })
  @ApiResponse({ status: 404, description: '留言不存在' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新留言信息' })
  @ApiParam({ name: 'id', description: '留言ID' })
  @ApiResponse({ status: 200, description: '成功更新留言' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '留言不存在' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除留言' })
  @ApiParam({ name: 'id', description: '留言ID' })
  @ApiResponse({ status: 200, description: '成功删除留言' })
  @ApiResponse({ status: 404, description: '留言不存在' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.remove(id);
  }
} 
