import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('联系信息')
@Controller('/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: '创建联系信息' })
  create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '获取联系信息列表（分页）' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  findAll(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.contactService.findAll(Number(page), Number(pageSize));
  }

  @Get('public')
  @ApiOperation({ summary: '获取前台可见的联系信息（启用）' })
  findPublic() {
    return this.contactService.findPublic();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单条联系信息' })
  @ApiParam({ name: 'id', description: 'ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新联系信息' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateContactDto) {
    return this.contactService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除联系信息' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.remove(id);
  }
}


