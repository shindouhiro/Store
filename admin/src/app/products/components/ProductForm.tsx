'use client';

import React, { useEffect, useState } from 'react';
import { ProForm, ProFormText, ProFormTextArea, ProFormDigit, ProFormSelect, ProFormSwitch } from '@ant-design/pro-components';
import { message, Upload, Button, Image, Space, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, EyeOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Product, CreateProductDto, UpdateProductDto } from '@/services/product';
import { getAllCategories, Category } from '@/services/category';
import { uploadToOSS, uploadMultipleToOSS, uploadVideoToOSS } from '@/services/oss';

// 后端DTO接口
interface BackendProductDto {
  name: string;
  description: string;
  price: string;
  categoryId: number;
  imageUrl: string;
  videoUrl?: string;
  features: string[];
  specifications: string;
  inStock: boolean;
  rating: string;
  reviewCount: number;
  tags: string[];
}

// OSS基础URL
const OSS_BASE_URL = 'https://dulizha.oss-cn-shanghai.aliyuncs.com/';

// 获取完整的图片URL
const getFullImageUrl = (url: string) => {
  if (!url) return '';
  // 如果URL已经是完整的HTTP/HTTPS链接，直接返回
  if (url.startsWith('http://') || url.startsWith('https://')) {
    console.log('getFullImageUrl - 完整URL:', url);
    return url;
  }
  // 否则拼接OSS基础URL和objectName
  const fullUrl = `${OSS_BASE_URL}${url}`;
  console.log('getFullImageUrl - 原始objectName:', url);
  console.log('getFullImageUrl - 拼接后完整URL:', fullUrl);
  return fullUrl;
};

// 获取完整的视频URL
const getFullVideoUrl = (url: string) => {
  if (!url) return '';
  // 如果URL已经是完整的HTTP/HTTPS链接，直接返回
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // 否则拼接OSS基础URL和objectName
  return `${OSS_BASE_URL}${url}`;
};

interface ProductFormProps {
  initialValues?: Product;
  onFinish: (values: CreateProductDto | UpdateProductDto | BackendProductDto) => Promise<void>;
  loading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onFinish, loading }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<string[]>(initialValues?.images || []);
  const [videoUrl, setVideoUrl] = useState<string>(initialValues?.videoUrl || '');
  const [uploading, setUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [videoPreviewVisible, setVideoPreviewVisible] = useState(false);

  useEffect(() => {
    // 获取分类列表
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        console.log(response);
        setCategories(response.data);
      } catch (error) {
        console.error('获取分类失败:', error);
      }
    };
    fetchCategories();
  }, []);

  // 处理视频上传
  const handleVideoUpload = async (file: File) => {
    setVideoUploading(true);
    try {
      console.log('开始上传视频:', file.name, '大小:', file.size, '类型:', file.type);
      
      const result = await uploadVideoToOSS(file);
      console.log('视频上传成功:', result);
      
      setVideoUrl(result.objectName);
      message.success('视频上传成功');
    } catch (error: any) {
      console.error('视频上传失败:', error);
      message.error(`视频上传失败: ${error.message || '未知错误'}`);
    } finally {
      setVideoUploading(false);
    }
  };

  // 处理多图上传
  const handleImagesUpload = async (files: File[]) => {
    setUploading(true);
    try {
      const results = await uploadMultipleToOSS(files);
      const newImages = results.map(result => result.objectName);
      console.log(newImages,'newImages')
      setImages(prev => [...prev, ...newImages]);
      message.success('图片上传成功');
    } catch {
      message.error('图片上传失败');
    } finally {
      setUploading(false);
    }
  };

  // 删除图片
  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // 删除视频
  const handleRemoveVideo = () => {
    setVideoUrl('');
  };

  // 预览图片
  const handlePreview = (url: string) => {
    setPreviewImage(getFullImageUrl(url));
    setPreviewVisible(true);
  };

  // 预览视频
  const handleVideoPreview = () => {
    setVideoPreviewVisible(true);
  };

  const handleFinish = async (values: CreateProductDto | UpdateProductDto) => {
    try {
      // 构造符合后端DTO的数据
      const formData = {
        name: values.name,
        description: values.description || '',
        price: values.price?.toString() || '0',
        categoryId: values.categoryId,
        imageUrl: images.length > 0 ? images[0] : '', // 使用第一张图片作为主图
        videoUrl: videoUrl || undefined,
        features: images.length > 0 ? images : [],
        specifications: values.description || '',
        inStock: (values.stock || 0) > 0,
        rating: '0',
        reviewCount: 0,
        tags: [],
      };
      await onFinish(formData as BackendProductDto);
    } catch {
      message.error('操作失败');
    }
  };

  const statusOptions = [
    { label: '上架', value: 'active' },
    { label: '下架', value: 'inactive' },
    { label: '草稿', value: 'draft' },
  ];

  return (
    <ProForm
      initialValues={initialValues}
      onFinish={handleFinish}
      submitter={{
        submitButtonProps: {
          loading,
        },
      }}
      layout="vertical"
    >
      <ProForm.Group>
        <ProFormText
          name="name"
          label="商品名称"
          placeholder="请输入商品名称"
          rules={[{ required: true, message: '请输入商品名称' }]}
          width="md"
        />
        <ProFormDigit
          name="price"
          label="售价"
          placeholder="请输入售价"
          rules={[{ required: true, message: '请输入售价' }]}
          min={0}
          precision={2}
          width="md"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDigit
          name="originalPrice"
          label="原价"
          placeholder="请输入原价"
          min={0}
          precision={2}
          width="md"
        />
        <ProFormDigit
          name="stock"
          label="库存"
          placeholder="请输入库存数量"
          rules={[{ required: true, message: '请输入库存数量' }]}
          min={0}
          width="md"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          name="categoryId"
          label="商品分类"
          placeholder="请选择商品分类"
          rules={[{ required: true, message: '请选择商品分类' }]}
          options={categories.map(cat => ({ label: cat.name, value: cat.id }))}
          width="md"
        />
        <ProFormSelect
          name="status"
          label="商品状态"
          placeholder="请选择商品状态"
          rules={[{ required: true, message: '请选择商品状态' }]}
          options={statusOptions}
          width="md"
        />
      </ProForm.Group>

      <ProFormTextArea
        name="description"
        label="商品描述"
        placeholder="请输入商品描述"
        fieldProps={{
          rows: 4,
        }}
      />

      <ProForm.Group>
        <ProFormText
          name="sku"
          label="SKU"
          placeholder="请输入SKU"
          width="md"
        />
        <ProFormText
          name="barcode"
          label="条形码"
          placeholder="请输入条形码"
          width="md"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDigit
          name="weight"
          label="重量(kg)"
          placeholder="请输入商品重量"
          min={0}
          precision={2}
          width="md"
        />
        <ProFormText
          name="dimensions"
          label="尺寸"
          placeholder="长x宽x高(cm)"
          width="md"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSwitch
          name="isFeatured"
          label="推荐商品"
        />
        <ProFormSwitch
          name="isHot"
          label="热门商品"
        />
      </ProForm.Group>

      {/* 视频上传 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>商品视频</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {videoUrl && (
            <div style={{ position: 'relative' }}>
              <video
                width={200}
                height={150}
                src={getFullVideoUrl(videoUrl)}
                controls
                style={{ objectFit: 'cover', borderRadius: 4 }}
              />
              <Button
                type="text"
                icon={<PlayCircleOutlined />}
                size="small"
                style={{ position: 'absolute', top: 4, left: 4 }}
                onClick={handleVideoPreview}
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                danger
                style={{ position: 'absolute', top: 4, right: 4 }}
                onClick={handleRemoveVideo}
              />
            </div>
          )}
          <Upload
            accept="video/*"
            showUploadList={false}
            beforeUpload={(file) => {
              // 检查文件大小 (100MB)
              const isLt100M = file.size / 1024 / 1024 < 100;
              if (!isLt100M) {
                message.error('视频文件大小不能超过100MB!');
                return false;
              }
              // 检查文件类型
              const isVideo = file.type.startsWith('video/');
              if (!isVideo) {
                message.error('只能上传视频文件!');
                return false;
              }
              handleVideoUpload(file);
              return false;
            }}
          >
            <Button icon={<PlusOutlined />} loading={videoUploading}>
              上传视频
            </Button>
          </Upload>
        </div>
        <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
          支持格式：MP4, AVI, MOV, WMV, FLV, WEBM, MKV，文件大小不超过100MB
        </div>
      </div>

      {/* 商品图片上传 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>商品图片</div>
        <Space wrap>
          {images.map((url, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <Image
                width={100}
                height={100}
                src={getFullImageUrl(url)}
                alt={`商品图片 ${index + 1}`}
                style={{ objectFit: 'cover' }}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
              />
              <Button
                type="text"
                icon={<EyeOutlined />}
                size="small"
                style={{ position: 'absolute', top: 4, left: 4 }}
                onClick={() => handlePreview(url)}
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                danger
                style={{ position: 'absolute', top: 4, right: 4 }}
                onClick={() => handleRemoveImage(index)}
              />
            </div>
          ))}
          <Upload
            accept="image/*"
            multiple
            showUploadList={false}
            beforeUpload={(file, fileList) => {
              handleImagesUpload(fileList);
              return false;
            }}
          >
            <Button icon={<PlusOutlined />} loading={uploading}>
              添加图片
            </Button>
          </Upload>
        </Space>
      </div>

      {/* 图片预览模态框 */}
      <Modal
        open={previewVisible}
        title="图片预览"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <Image
          alt="预览图片"
          style={{ width: '100%' }}
          src={previewImage}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
        />
      </Modal>

      {/* 视频预览模态框 */}
      <Modal
        open={videoPreviewVisible}
        title="视频预览"
        footer={null}
        onCancel={() => setVideoPreviewVisible(false)}
        width={800}
      >
        <video
          controls
          style={{ width: '100%' }}
          src={getFullVideoUrl(videoUrl)}
        >
          您的浏览器不支持视频播放
        </video>
      </Modal>
    </ProForm>
  );
};

export default ProductForm; 
