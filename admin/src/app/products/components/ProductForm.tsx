'use client';

import React, { useEffect, useState } from 'react';
import { ProForm, ProFormText, ProFormTextArea, ProFormDigit, ProFormSelect, ProFormSwitch } from '@ant-design/pro-components';
import { message } from 'antd';
import { Product, CreateProductDto, UpdateProductDto } from '@/services/product';
import { getAllCategories, Category } from '@/services/category';

interface ProductFormProps {
  initialValues?: Product;
  onFinish: (values: CreateProductDto | UpdateProductDto) => Promise<void>;
  loading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onFinish, loading }) => {
  const [categories, setCategories] = useState<Category[]>([]);

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

  const handleFinish = async (values: CreateProductDto | UpdateProductDto) => {
    try {
      await onFinish(values);
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
    </ProForm>
  );
};

export default ProductForm; 
