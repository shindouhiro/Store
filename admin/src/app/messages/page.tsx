'use client';

import React, { useRef } from 'react';
import { ProTable, ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Modal, Space, Typography, Table } from 'antd';
import { DeleteOutlined, EyeOutlined, MessageOutlined } from '@ant-design/icons';
import { Message, getMessageList, deleteMessage } from '@/services/message';

const { Text, Paragraph } = Typography;

const MessagePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [detailModalVisible, setDetailModalVisible] = React.useState(false);
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(null);

  // 处理删除
  const handleDelete = async (id: number) => {
    try {
      await deleteMessage(id);
      message.success('删除成功');
      actionRef.current?.reload();
    } catch {
      message.error('删除失败');
    }
  };

  // 查看留言详情
  const handleViewDetail = (record: Message) => {
    setSelectedMessage(record);
    setDetailModalVisible(true);
  };

  const columns: ProColumns<Message>[] = [
    {
      title: '姓名',
      dataIndex: 'firstName',
      width: 120,
      render: (_, record) => `${record.firstName} ${record.lastName}`,
      search: {
        transform: (value) => ({ firstName: value }),
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200,
      ellipsis: true,
      copyable: true,
    },
    {
      title: '公司',
      dataIndex: 'company',
      width: 150,
      ellipsis: true,
      render: (_, record) => record.company || '-',
    },
    {
      title: '产品兴趣',
      dataIndex: 'productInterest',
      width: 150,
      ellipsis: true,
      render: (_, record) => record.productInterest || '-',
    },
    {
      title: '留言内容',
      dataIndex: 'message',
      width: 300,
      ellipsis: true,
      search: false,
      render: (_, record) => (
        <div style={{ maxWidth: 280 }}>
          <Text ellipsis={{ tooltip: record.message }}>
            {record.message}
          </Text>
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 150,
      search: false,
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 150,
      search: false,
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record) => [
        <Button
          key="view"
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handleViewDetail(record)}
        >
          查看
        </Button>,
        <Popconfirm
          key="delete"
          title="确定要删除这条留言吗？"
          onConfirm={() => handleDelete(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
          >
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<Message>
        headerTitle="留言管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<MessageOutlined />}
            type="primary"
            disabled
          >
            留言统计
          </Button>,
        ]}
        request={async (params) => {
          try {
            const response = await getMessageList({
              page: params.current,
              pageSize: params.pageSize,
              firstName: params.firstName,
              lastName: params.lastName,
              email: params.email,
              company: params.company,
              productInterest: params.productInterest,
            });
            const responseData = response.data as { data?: Message[]; total?: number };
            return {
              data: responseData.data || [],
              success: true,
              total: responseData.total || 0,
            };
          } catch {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
        scroll={{ x: 1200, y: 600 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={false}
      />

      {/* 留言详情模态框 */}
      <Modal
        title="留言详情"
        open={detailModalVisible}
        onCancel={() => {
          setDetailModalVisible(false);
          setSelectedMessage(null);
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setDetailModalVisible(false);
              setSelectedMessage(null);
            }}
          >
            关闭
          </Button>,
        ]}
        width={600}
      >
        {selectedMessage && (
          <div>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong>姓名：</Text>
                <Text>{selectedMessage.firstName} {selectedMessage.lastName}</Text>
              </div>
              <div>
                <Text strong>邮箱：</Text>
                <Text copyable>{selectedMessage.email}</Text>
              </div>
              {selectedMessage.company && (
                <div>
                  <Text strong>公司：</Text>
                  <Text>{selectedMessage.company}</Text>
                </div>
              )}
              {selectedMessage.productInterest && (
                <div>
                  <Text strong>产品兴趣：</Text>
                  <Text>{selectedMessage.productInterest}</Text>
                </div>
              )}
              <div>
                <Text strong>留言内容：</Text>
                <div style={{ marginTop: 8 }}>
                  <Paragraph style={{ 
                    background: '#f5f5f5', 
                    padding: 12, 
                    borderRadius: 6,
                    margin: 0,
                    whiteSpace: 'pre-wrap'
                  }}>
                    {selectedMessage.message}
                  </Paragraph>
                </div>
              </div>
              <div>
                <Text strong>创建时间：</Text>
                <Text>{new Date(selectedMessage.createdAt).toLocaleString()}</Text>
              </div>
              <div>
                <Text strong>更新时间：</Text>
                <Text>{new Date(selectedMessage.updatedAt).toLocaleString()}</Text>
              </div>
            </Space>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MessagePage; 
