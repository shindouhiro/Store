import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class LoginDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  username: string;
  
  @ApiProperty({ description: '密码', example: 'admin123' })
  password: string;
}

class RegisterDto extends LoginDto {
  @ApiProperty({ description: '昵称', example: '管理员', required: false })
  nickname?: string;
}

class LoginResponseDto {
  @ApiProperty({ description: '访问令牌' })
  access_token: string;
}

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '用户登录' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: '登录成功', 
    type: LoginResponseDto 
  })
  @ApiResponse({ 
    status: 401, 
    description: '用户名或密码错误' 
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new Error('用户名或密码错误');
    }
    return this.authService.login(user);
  }

  @ApiOperation({ summary: '用户注册' })
  @ApiBody({ type: RegisterDto })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.username,
      registerDto.password,
      registerDto.nickname,
    );
  }
} 
