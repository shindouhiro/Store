'use client';

import React, { useRef, useState } from 'react';
import { ProTable, ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Modal, Form, Input, Select, Switch, InputNumber, message, Space, Typography, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ContactInfo, CreateContactDto, UpdateContactDto } from '@/services/contact';
import { getContactList, createContact, updateContact, deleteContact } from '@/services/contact';

const { TextArea } = Input;
const { Text } = Typography;

const ContactPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ContactInfo | null>(null);
  const [form] = Form.useForm<CreateContactDto>();

  const columns: ProColumns<ContactInfo>[] = [
    { title: 'ID', dataIndex: 'id', width: 60, search: false },
    { title: '类型', dataIndex: 'type', width: 120 },
    { title: '标题', dataIndex: 'title', width: 220 },
    { title: '图标', dataIndex: 'icon', width: 160, ellipsis: true, render: (_, r) => r.icon || '-' },
    { title: '渐变', dataIndex: 'gradient', width: 200, ellipsis: true, render: (_, r) => r.gradient || '-' },
    {
      title: '详情',
      dataIndex: 'detailsJson',
      width: 260,
      search: false,
      render: (_, r) => (
        <Text ellipsis={{ tooltip: r.detailsJson }}>{r.detailsJson || '-'}</Text>
      )
    },
    {
      title: '启用',
      dataIndex: 'isActive',
      width: 100,
      search: false,
      valueType: 'switch',
      render: (_, r) => <Switch checked={r.isActive} disabled />
    },
    { title: '排序', dataIndex: 'sortOrder', width: 100, search: false },
    { title: '创建时间', dataIndex: 'createdAt', valueType: 'dateTime', width: 160, search: false },
    { title: '更新时间', dataIndex: 'updatedAt', valueType: 'dateTime', width: 160, search: false },
    {
      title: '操作',
      valueType: 'option',
      width: 160,
      fixed: 'right',
      render: (_, record) => [
        <Button key="edit" type="link" size="small" icon={<EditOutlined />} onClick={() => onEdit(record)}>编辑</Button>,
        <Popconfirm key="del" title="确认删除?" onConfirm={() => onDelete(record.id)}>
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Popconfirm>
      ]
    }
  ];

  const onAdd = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };

  const onEdit = (record: ContactInfo) => {
    setEditing(record);
    form.setFieldsValue({
      type: record.type,
      title: record.title,
      icon: record.icon || undefined,
      gradient: record.gradient || undefined,
      detailsJson: record.detailsJson || undefined,
      isActive: record.isActive,
      sortOrder: record.sortOrder,
    });
    setModalOpen(true);
  };

  const onDelete = async (id: number) => {
    try {
      await deleteContact(id);
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (e) {
      message.error('删除失败');
    }
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        await updateContact(editing.id, values as UpdateContactDto);
        message.success('更新成功');
      } else {
        await createContact(values as CreateContactDto);
        message.success('创建成功');
      }
      setModalOpen(false);
      actionRef.current?.reload();
    } catch {
      // ignore
    }
  };

  return (
    <div>
      <ProTable<ContactInfo>
        headerTitle="联系信息"
        columns={columns}
        rowKey="id"
        actionRef={actionRef}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={onAdd}>新建</Button>
        ]}
        request={async (params) => {
          try {
            const res = await getContactList({ page: params.current, pageSize: params.pageSize });
            const payload = res.data as any;
            return { data: payload.data || [], total: payload.total || 0, success: true };
          } catch {
            return { data: [], total: 0, success: false };
          }
        }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        scroll={{ x: 1200 }}
      />

      <Modal
        title={editing ? '编辑联系信息' : '新建联系信息'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={onSubmit}
        width={720}
      >
        <Form form={form} layout="vertical" initialValues={{ type: 'location', isActive: true, sortOrder: 0 }}>
          <Form.Item name="type" label="类型" rules={[{ required: true, message: '请选择类型' }]}>
            <Select options={[
              { value: 'location', label: 'location' },
              { value: 'phone', label: 'phone' },
              { value: 'email', label: 'email' },
              { value: 'social', label: 'social' },
            ]} />
          </Form.Item>
          <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
            <Input maxLength={200} placeholder="例如：Our Location / Phone & WhatsApp / Email Address / Follow Us" />
          </Form.Item>
          <Form.Item name="icon" label="图标标识">
            <Input maxLength={100} placeholder="例如：MapPin / Phone / Mail / LinkedIn" />
          </Form.Item>
          <Form.Item name="gradient" label="背景渐变">
            <Input maxLength={200} placeholder="例如：from-blue-500 to-purple-600" />
          </Form.Item>
          <Form.Item name="detailsJson" label="详情 JSON">
            <TextArea rows={6} placeholder={`非 social 类型使用字符串数组，如：\n["123 Business District","Shanghai, China 200000","Manufacturing Hub"]\n\n社交社媒(social) 使用对象数组，如：\n[{"icon":"fab fa-linkedin","href":"#","label":"LinkedIn"}]`} />
          </Form.Item>
          <Space size="large">
            <Form.Item name="isActive" label="启用" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="sortOrder" label="排序权重">
              <InputNumber min={0} />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default ContactPage;


