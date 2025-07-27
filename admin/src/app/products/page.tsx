'use client';

import React, { useState, useRef } from 'react';
import { ProTable, ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Tag, Image, Switch, Modal, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, PlayCircleOutlined, PictureOutlined } from '@ant-design/icons';
import { Product, getProductList, deleteProduct, toggleProductStatus, setProductFeatured, setProductHot, CreateProductDto, UpdateProductDto } from '@/services/product';
import ProductForm from './components/ProductForm';
import { createProduct, updateProduct } from '@/services/product';

// OSS基础URL
const OSS_BASE_URL = 'https://dulizha.oss-cn-shanghai.aliyuncs.com/';

// 获取完整的图片URL
const getFullImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${OSS_BASE_URL}${url}`;
};

// 获取完整的视频URL
const getFullVideoUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${OSS_BASE_URL}${url}`;
};

const ProductPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(false);
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
  const [videoPreviewVisible, setVideoPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewVideo, setPreviewVideo] = useState('');
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const actionRef = useRef<ActionType>();

  // 处理表单提交
  const handleFormSubmit = async (values: CreateProductDto | UpdateProductDto) => {
    setLoading(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, values as UpdateProductDto);
        message.success('商品更新成功');
      } else {
        await createProduct(values as CreateProductDto);
        message.success('商品创建成功');
      }
      setModalVisible(false);
      setEditingProduct(undefined);
      actionRef.current?.reload();
    } catch {
      message.error('操作失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理删除
  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      message.success('删除成功');
      actionRef.current?.reload();
    } catch {
      message.error('删除失败');
    }
  };

  // 处理状态切换
  const handleStatusToggle = async (id: number) => {
    try {
      await toggleProductStatus(id);
      message.success('状态更新成功');
      actionRef.current?.reload();
    } catch {
      message.error('状态更新失败');
    }
  };

  // 处理推荐状态切换
  const handleFeaturedToggle = async (id: number, isFeatured: boolean) => {
    try {
      await setProductFeatured(id, !isFeatured);
      message.success('推荐状态更新成功');
      actionRef.current?.reload();
    } catch {
      message.error('推荐状态更新失败');
    }
  };

  // 处理热门状态切换
  const handleHotToggle = async (id: number, isHot: boolean) => {
    try {
      await setProductHot(id, !isHot);
      message.success('热门状态更新成功');
      actionRef.current?.reload();
    } catch {
      message.error('热门状态更新失败');
    }
  };

  // 预览图片
  const handleImagePreview = (images: string[]) => {
    setPreviewImages(images.map(img => getFullImageUrl(img)));
    setImagePreviewVisible(true);
  };

  // 预览视频
  const handleVideoPreview = (videoUrl: string) => {
    setPreviewVideo(getFullVideoUrl(videoUrl));
    setVideoPreviewVisible(true);
  };

  const columns: ProColumns<Product>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      search: false,
      fixed: 'left',
    },
    {
      title: '商品图片',
      dataIndex: 'features',
      width: 120,
      search: false,
      render: (_, record) => {
        // 从 features 数组中获取图片，过滤掉非图片文件
        const images = (record.features || []).filter((item: string) => 
          item && (item.includes('.jpg') || item.includes('.jpeg') || item.includes('.png') || item.includes('.gif') || item.includes('.webp'))
        );
        
        if (images.length === 0) {
          return (
            <div style={{ width: 60, height: 60, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
              无图
            </div>
          );
        }
        
        return (
          <div style={{ position: 'relative' }}>
            <Image
              width={60}
              height={60}
              src={getFullImageUrl(images[0])}
              alt={`${record.name || '商品'} 图片`}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
              style={{ objectFit: 'cover' }}
            />
            {images.length > 1 && (
              <div style={{ 
                position: 'absolute', 
                top: -5, 
                right: -5, 
                background: '#1890ff', 
                color: 'white', 
                borderRadius: '50%', 
                width: 20, 
                height: 20, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: 10 
              }}>
                +{images.length - 1}
              </div>
            )}
            <Button
              type="text"
              icon={<PictureOutlined />}
              size="small"
              style={{ position: 'absolute', bottom: 0, left: 0, background: 'rgba(0,0,0,0.5)', color: 'white' }}
              onClick={() => handleImagePreview(images)}
            />
          </div>
        );
      },
    },
    {
      title: '商品视频',
      dataIndex: 'videoUrl',
      width: 120,
      search: false,
      render: (_, record) => {
        if (!record.videoUrl) {
          return (
            <div style={{ width: 60, height: 60, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
              无视频
            </div>
          );
        }
        
        return (
          <div style={{ position: 'relative' }}>
            <video
              width={60}
              height={60}
              src={getFullVideoUrl(record.videoUrl)}
              style={{ objectFit: 'cover', borderRadius: 4 }}
            />
            <Button
              type="text"
              icon={<PlayCircleOutlined />}
              size="small"
              style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                background: 'rgba(0,0,0,0.7)', 
                color: 'white',
                border: 'none'
              }}
              onClick={() => handleVideoPreview(record.videoUrl)}
            />
          </div>
        );
      },
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      width: 200,
      ellipsis: true,
    },
    {
      title: '价格',
      dataIndex: 'price',
      width: 100,
      search: false,
      render: (_, record) => `¥${Number(record.price || 0).toFixed(2)}`,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      width: 80,
      search: false,
      render: (_, record) => (
        <Tag color={Number(record.stock || 0) > 0 ? 'green' : 'red'}>
          {Number(record.stock || 0)}
        </Tag>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: 120,
      search: false,
      render: (_, record) => record.category?.name || '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueType: 'select',
      valueEnum: {
        active: { text: '上架', status: 'Success' },
        inactive: { text: '下架', status: 'Default' },
        draft: { text: '草稿', status: 'Warning' },
      },
      render: (_, record) => (
        <Switch
          checked={record.status === 'active'}
          onChange={() => handleStatusToggle(record.id)}
          size="small"
        />
      ),
    },
    {
      title: '推荐',
      dataIndex: 'isFeatured',
      width: 80,
      search: false,
      render: (_, record) => (
        <Switch
          checked={record.isFeatured}
          onChange={() => handleFeaturedToggle(record.id, record.isFeatured)}
          size="small"
        />
      ),
    },
    {
      title: '热门',
      dataIndex: 'isHot',
      width: 80,
      search: false,
      render: (_, record) => (
        <Switch
          checked={record.isHot}
          onChange={() => handleHotToggle(record.id, record.isHot)}
          size="small"
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 150,
      search: false,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => [
        <Button
          key="view"
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => {
            setEditingProduct(record);
            setModalVisible(true);
          }}
        >
          查看
        </Button>,
        <Button
          key="edit"
          type="link"
          size="small"
          icon={<EditOutlined />}
          onClick={() => {
            setEditingProduct(record);
            setModalVisible(true);
          }}
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确定要删除这个商品吗？"
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
      <ProTable<Product>
        headerTitle="商品管理"
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
            onClick={() => {
              setEditingProduct(undefined);
              setModalVisible(true);
            }}
          >
            新建商品
          </Button>,
        ]}
        request={async (params) => {
          try {
            const response = await getProductList({
              page: params.current,
              pageSize: params.pageSize,
              name: params.name,
              categoryId: params.categoryId,
              status: params.status,
              isFeatured: params.isFeatured,
              isHot: params.isHot,
            });
            return {
              data: response.data.data || response.data,
              success: true,
              total: response.data.total || 0,
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
        scroll={{ x: 1400, y: 600 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      {/* 商品表单模态框 */}
      <Modal
        title={editingProduct ? '编辑商品' : '新建商品'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingProduct(undefined);
        }}
        footer={null}
        width={800}
      >
        <ProductForm
          initialValues={editingProduct}
          onFinish={handleFormSubmit}
          loading={loading}
        />
      </Modal>

      {/* 图片预览模态框 */}
      <Modal
        open={imagePreviewVisible}
        title="商品图片预览"
        footer={null}
        onCancel={() => setImagePreviewVisible(false)}
        width={800}
      >
        <Image.PreviewGroup>
          <Space wrap>
            {previewImages.map((url, index) => (
              <Image
                key={index}
                width={200}
                src={url}
                alt={`商品图片 ${index + 1}`}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
              />
            ))}
          </Space>
        </Image.PreviewGroup>
      </Modal>

      {/* 视频预览模态框 */}
      <Modal
        open={videoPreviewVisible}
        title="商品视频预览"
        footer={null}
        onCancel={() => setVideoPreviewVisible(false)}
        width={800}
      >
        <video
          controls
          style={{ width: '100%' }}
          src={previewVideo}
        >
          您的浏览器不支持视频播放
        </video>
      </Modal>
    </div>
  );
};

export default ProductPage; 
