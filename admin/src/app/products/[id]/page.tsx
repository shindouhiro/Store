'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Descriptions, Tag, Button, Image, message, Spin } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Product, getProduct } from '@/services/product';

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = Number(params.id);
        if (isNaN(id)) {
          message.error('商品ID无效');
          router.push('/products');
          return;
        }

        const response = await getProduct(id);
        setProduct(response.data);
      } catch (error) {
        message.error('获取商品信息失败');
        router.push('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, router]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>商品不存在</p>
        <Button onClick={() => router.push('/products')}>返回商品列表</Button>
      </div>
    );
  }

  const statusMap = {
    active: { text: '上架', color: 'green' },
    inactive: { text: '下架', color: 'red' },
    draft: { text: '草稿', color: 'orange' },
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => router.push('/products')}
          style={{ marginRight: '8px' }}
        >
          返回列表
        </Button>
        <Button 
          type="primary" 
          icon={<EditOutlined />}
          onClick={() => router.push(`/products/edit/${product.id}`)}
        >
          编辑商品
        </Button>
      </div>

      <Card title="商品详情" style={{ marginBottom: '16px' }}>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="商品ID">{product.id}</Descriptions.Item>
          <Descriptions.Item label="商品名称">{product.name}</Descriptions.Item>
          <Descriptions.Item label="售价">¥{product.price.toFixed(2)}</Descriptions.Item>
          <Descriptions.Item label="原价">
            {product.originalPrice ? `¥${product.originalPrice.toFixed(2)}` : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="库存">
            <Tag color={product.stock > 0 ? 'green' : 'red'}>
              {product.stock}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="商品状态">
            <Tag color={statusMap[product.status].color}>
              {statusMap[product.status].text}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="分类">
            {product.category?.name || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="SKU">{product.sku || '-'}</Descriptions.Item>
          <Descriptions.Item label="条形码">{product.barcode || '-'}</Descriptions.Item>
          <Descriptions.Item label="重量">
            {product.weight ? `${product.weight}kg` : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="尺寸">{product.dimensions || '-'}</Descriptions.Item>
          <Descriptions.Item label="推荐商品">
            <Tag color={product.isFeatured ? 'blue' : 'default'}>
              {product.isFeatured ? '是' : '否'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="热门商品">
            <Tag color={product.isHot ? 'red' : 'default'}>
              {product.isHot ? '是' : '否'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="创建时间" span={2}>
            {new Date(product.createdAt).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间" span={2}>
            {new Date(product.updatedAt).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="商品描述" span={2}>
            {product.description || '暂无描述'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {product.images && product.images.length > 0 && (
        <Card title="商品图片" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {product.images.map((image, index) => (
              <Image
                key={index}
                width={120}
                height={120}
                src={image}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
                style={{ objectFit: 'cover' }}
              />
            ))}
          </div>
        </Card>
      )}

      {product.tags && product.tags.length > 0 && (
        <Card title="商品标签">
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {product.tags.map((tag, index) => (
              <Tag key={index} color="blue">{tag}</Tag>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProductDetailPage; 
