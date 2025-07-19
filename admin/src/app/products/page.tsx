'use client';

import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ProductPage: React.FC = () => {
  return (
    <div>
      <ProTable
        headerTitle="产品管理"
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            新建产品
          </Button>,
        ]}
        request={async () => {
          return {
            data: [],
            success: true,
            total: 0,
          };
        }}
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',
            width: 80,
          },
          {
            title: '产品名称',
            dataIndex: 'name',
            width: 200,
          },
          {
            title: '价格',
            dataIndex: 'price',
            width: 100,
          },
          {
            title: '分类',
            dataIndex: 'category',
            width: 150,
          },
          {
            title: '状态',
            dataIndex: 'status',
            width: 100,
          },
        ]}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </div>
  );
};

export default ProductPage; 
