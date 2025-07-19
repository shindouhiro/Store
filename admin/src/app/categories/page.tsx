'use client';

import React, { useState, useRef } from 'react';
import {
  ProTable,
  ProFormText,
  ProFormTextArea,
  ProFormSwitch,
  ProFormDigit,
  ModalForm,
  ActionType,
  ProColumns,
} from '@ant-design/pro-components';
import { Button, Switch, Input, message, Popconfirm, Space, Tag, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { 
  getCategoryList, 
  createCategory, 
  updateCategory, 
  deleteCategory, 
  toggleCategoryStatus,
  updateCategorySortOrder,
  type Category,
  type CreateCategoryDto,
  type UpdateCategoryDto 
} from '@/services/category';

const CategoryPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  // 表格列定义
  const columns: ProColumns<Category>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      search: false,
      fixed: 'left',
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      width: 180,
      fixed: 'left',
      render: (text, record) => (
        <Space>
          {record.icon && <span className="text-lg">{record.icon}</span>}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      width: 250,
      ellipsis: true,
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      width: 100,
      valueType: 'select',
      valueEnum: {
        true: { text: '启用', status: 'Success' },
        false: { text: '禁用', status: 'Error' },
      },
      render: (_, record) => (
        <Switch
          checked={record.isActive}
          onChange={async () => {
            try {
              await toggleCategoryStatus(record.id);
              message.success('状态更新成功');
              actionRef.current?.reload();
            } catch {
              message.error('状态更新失败');
            }
          }}
        />
      ),
    },
    {
      title: '排序',
      dataIndex: 'sortOrder',
      width: 120,
      search: false,
      render: (text, record) => (
        <Input
          type="number"
          defaultValue={text as number}
          style={{ width: 80 }}
          onChange={async (e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              try {
                await updateCategorySortOrder(record.id, value);
                message.success('排序更新成功');
                actionRef.current?.reload();
              } catch {
                message.error('排序更新失败');
              }
            }
          }}
        />
      ),
    },
    {
      title: '产品数量',
      dataIndex: 'products',
      width: 120,
      search: false,
      render: (_, record) => (
        <Tag color="blue">{record.products?.length || 0}</Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 180,
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 180,
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 300,
      fixed: 'right',
      render: (_, record) => [
        <Tooltip key="view" title="查看详情">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setCurrentCategory(record);
              setEditModalVisible(true);
            }}
          >
            查看
          </Button>
        </Tooltip>,
        <Tooltip key="edit" title="编辑">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentCategory(record);
              setEditModalVisible(true);
            }}
          >
            编辑
          </Button>
        </Tooltip>,
        <Popconfirm
          key="delete"
          title="确定要删除这个分类吗？"
          description="删除后无法恢复，如果分类下有产品则无法删除"
          onConfirm={async () => {
            try {
              await deleteCategory(record.id);
              message.success('删除成功');
              actionRef.current?.reload();
            } catch {
              message.error('删除失败');
            }
          }}
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  // 创建分类
  const handleCreate = async (values: CreateCategoryDto) => {
    try {
      await createCategory(values);
      message.success('创建成功');
      setCreateModalVisible(false);
      actionRef.current?.reload();
    } catch {
      message.error('创建失败');
    }
  };

  // 更新分类
  const handleUpdate = async (values: UpdateCategoryDto) => {
    if (!currentCategory) return;
    
    try {
      await updateCategory(currentCategory.id, values);
      message.success('更新成功');
      setEditModalVisible(false);
      setCurrentCategory(null);
      actionRef.current?.reload();
    } catch {
      message.error('更新失败');
    }
  };

  return (
    <div>
      <ProTable<Category>
        headerTitle="分类管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            新建分类
          </Button>,
        ]}
        request={async (params) => {
          const { current, pageSize, isActive } = params;
          const result = await getCategoryList({
            page: current || 1,
            pageSize: pageSize || 10,
            active: isActive,
          });
          return {
            data: result.data.data,
            success: true,
            total: result.data.total,
          };
        }}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        scroll={{ x: 1200 }}
        sticky
      />

      {/* 创建分类模态框 */}
      <ModalForm
        title="新建分类"
        width={600}
        open={createModalVisible}
        onOpenChange={setCreateModalVisible}
        onFinish={handleCreate}
        modalProps={{
          destroyOnClose: true,
        }}
      >
        <ProFormText
          name="name"
          label="分类名称"
          placeholder="请输入分类名称"
          rules={[
            { required: true, message: '请输入分类名称' },
            { min: 1, max: 50, message: '分类名称长度在1-50个字符之间' },
          ]}
        />
        <ProFormTextArea
          name="description"
          label="分类描述"
          placeholder="请输入分类描述"
          rules={[
            { max: 200, message: '分类描述不能超过200个字符' },
          ]}
        />
        <ProFormText
          name="icon"
          label="分类图标"
          placeholder="请输入图标名称或emoji"
          rules={[
            { max: 50, message: '图标名称不能超过50个字符' },
          ]}
        />
        <ProFormDigit
          name="sortOrder"
          label="排序权重"
          placeholder="请输入排序权重"
          min={0}
          max={999}
          rules={[
            { type: 'number', min: 0, message: '排序权重不能小于0' },
          ]}
        />
        <ProFormSwitch
          name="isActive"
          label="是否启用"
          initialValue={true}
        />
      </ModalForm>

      {/* 编辑分类模态框 */}
      <ModalForm
        title="编辑分类"
        width={600}
        open={editModalVisible}
        onOpenChange={setEditModalVisible}
        onFinish={handleUpdate}
        modalProps={{
          destroyOnClose: true,
        }}
        initialValues={currentCategory || {}}
      >
        <ProFormText
          name="name"
          label="分类名称"
          placeholder="请输入分类名称"
          rules={[
            { required: true, message: '请输入分类名称' },
            { min: 1, max: 50, message: '分类名称长度在1-50个字符之间' },
          ]}
        />
        <ProFormTextArea
          name="description"
          label="分类描述"
          placeholder="请输入分类描述"
          rules={[
            { max: 200, message: '分类描述不能超过200个字符' },
          ]}
        />
        <ProFormText
          name="icon"
          label="分类图标"
          placeholder="请输入图标名称或emoji"
          rules={[
            { max: 50, message: '图标名称不能超过50个字符' },
          ]}
        />
        <ProFormDigit
          name="sortOrder"
          label="排序权重"
          placeholder="请输入排序权重"
          min={0}
          max={999}
          rules={[
            { type: 'number', min: 0, message: '排序权重不能小于0' },
          ]}
        />
        <ProFormSwitch
          name="isActive"
          label="是否启用"
        />
      </ModalForm>
    </div>
  );
};

export default CategoryPage; 
