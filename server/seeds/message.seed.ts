import { DataSource } from 'typeorm';
import { Message } from '../src/message/entities/message.entity';

export const messageSeed = async (dataSource: DataSource) => {
  const messageRepository = dataSource.getRepository(Message);

  // 检查是否已有数据
  const existingMessages = await messageRepository.count();
  if (existingMessages > 0) {
    console.log('留言数据已存在，跳过种子数据创建');
    return;
  }

  const messages = [
    {
      firstName: '张',
      lastName: '三',
      email: 'zhangsan@example.com',
      company: 'ABC科技有限公司',
      productInterest: '电子产品',
      message: '我对你们的产品很感兴趣，希望能了解更多关于技术规格和价格的信息。',
    },
    {
      firstName: '李',
      lastName: '四',
      email: 'lisi@example.com',
      company: 'XYZ贸易公司',
      productInterest: '办公用品',
      message: '我们公司正在寻找优质的办公用品供应商，请提供产品目录和报价。',
    },
    {
      firstName: '王',
      lastName: '五',
      email: 'wangwu@example.com',
      company: '创新科技',
      productInterest: '软件开发',
      message: '我们正在开发一个电商平台，需要了解你们的API接口和集成方案。',
    },
    {
      firstName: '赵',
      lastName: '六',
      email: 'zhaoliu@example.com',
      productInterest: '家居用品',
      message: '个人用户，想购买一些家居用品，请问有优惠活动吗？',
    },
    {
      firstName: '孙',
      lastName: '七',
      email: 'sunqi@example.com',
      company: '绿色环保公司',
      productInterest: '环保产品',
      message: '我们公司专注于环保事业，希望与你们合作推广环保产品。',
    },
  ];

  for (const messageData of messages) {
    const message = messageRepository.create(messageData);
    await messageRepository.save(message);
  }

  console.log(`成功创建 ${messages.length} 条留言种子数据`);
}; 
