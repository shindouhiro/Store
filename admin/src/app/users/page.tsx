'use client';

import { ProTable } from '@ant-design/pro-components';
import { Button, Tag, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';

interface UserItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createTime: string;
}

const statusMap = {
  active: { color: 'success', text: '正常' },
  inactive: { color: 'default', text: '未激活' },
  blocked: { color: 'error', text: '已封禁' },
};

export default function UsersPage() {
  const columns: ProColumns<UserItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 180,
    },
    {
      title: '角色',
      dataIndex: 'role',
      width: 100,
      render: (_, record) => (
        <Tag color="blue">{record.role}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (_, record) => {
        const status = statusMap[record.status as keyof typeof statusMap];
        return <Tag color={status.color}>{status.text}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
    },
    {
      title: '操作',
      width: 180,
      valueType: 'option',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" onClick={() => message.info('编辑用户：' + record.name)}>
            编辑
          </Button>
          <Button type="link" size="small" danger onClick={() => message.info('删除用户：' + record.name)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const mockData: UserItem[] = [
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      role: '管理员',
      status: 'active',
      createTime: '2024-03-01 12:00:00',
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      role: '编辑',
      status: 'active',
      createTime: '2024-03-02 14:30:00',
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      role: '用户',
      status: 'inactive',
      createTime: '2024-03-03 09:15:00',
    },
  ];

  return (
    <ProTable<UserItem>
      columns={columns}
      dataSource={mockData}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => message.info('新建用户')}
        >
          新建
        </Button>,
      ]}
    />
  );
} 
