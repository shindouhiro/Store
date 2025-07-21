import { Controller, Get, UseGuards, Request, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取当前用户信息' })
  @ApiResponse({ 
    status: 200, 
    description: '成功获取用户信息',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: '用户ID' },
        username: { type: 'string', description: '用户名' },
        nickname: { type: 'string', description: '昵称' },
        email: { type: 'string', description: '邮箱' },
        role: { type: 'string', description: '角色' },
        createdAt: { type: 'string', format: 'date-time', description: '创建时间' },
        updatedAt: { type: 'string', format: 'date-time', description: '更新时间' }
      }
    }
  })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async getProfile(@Request() req) {
    try {
      const userId = req.user.sub;
      const user = await this.userService.findById(userId);
      
      if (!user) {
        throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
      }

      // 返回用户信息，排除密码字段
      const { password, ...userInfo } = user;
      return {
        success: true,
        data: userInfo,
        message: '获取用户信息成功'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('获取用户信息失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('info/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '根据用户ID获取用户信息' })
  @ApiResponse({ 
    status: 200, 
    description: '成功获取用户信息',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: '用户ID' },
        username: { type: 'string', description: '用户名' },
        nickname: { type: 'string', description: '昵称' },
        email: { type: 'string', description: '邮箱' },
        role: { type: 'string', description: '角色' },
        createdAt: { type: 'string', format: 'date-time', description: '创建时间' },
        updatedAt: { type: 'string', format: 'date-time', description: '更新时间' }
      }
    }
  })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async getUserById(@Request() req, @Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.findById(id);
      
      if (!user) {
        throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
      }

      // 返回用户信息，排除密码字段
      const { password, ...userInfo } = user;
      return {
        success: true,
        data: userInfo,
        message: '获取用户信息成功'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('获取用户信息失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 
 