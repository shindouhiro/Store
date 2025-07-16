import { AppDataSource } from './data-source';
import { User } from '../src/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

export async function seedUsers() {
  const userRepository = AppDataSource.getRepository(User);

  // 检查是否已存在管理员用户
  const existingAdmin = await userRepository.findOne({ where: { username: 'admin' } });
  if (existingAdmin) {
    console.log('管理员用户已存在，跳过创建');
    return;
  }

  // 创建管理员用户
  const adminUser = new User();
  adminUser.username = 'admin';
  adminUser.email = 'admin@example.com';
  adminUser.password = await bcrypt.hash('admin123', 10);
  adminUser.nickname = '系统管理员';
  adminUser.role = 'admin';
  await userRepository.save(adminUser);
  console.log('管理员用户创建成功');

  // 创建测试用户
  const testUsers = [
    {
      username: 'user1',
      email: 'user1@example.com',
      password: 'user123',
      nickname: '测试用户1',
      role: 'user'
    },
    {
      username: 'user2',
      email: 'user2@example.com',
      password: 'user123',
      nickname: '测试用户2',
      role: 'user'
    }
  ];

  for (const userData of testUsers) {
    const existingUser = await userRepository.findOne({ where: { username: userData.username } });
    if (existingUser) {
      console.log(`用户 ${userData.username} 已存在，跳过创建`);
      continue;
    }

    const user = new User();
    user.username = userData.username;
    user.email = userData.email;
    user.password = await bcrypt.hash(userData.password, 10);
    user.nickname = userData.nickname;
    user.role = userData.role as 'user' | 'admin';
    await userRepository.save(user);
    console.log(`测试用户 ${userData.username} 创建成功`);
  }
} 
