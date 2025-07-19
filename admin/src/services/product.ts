import { request } from '@/lib/axios';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  categoryId: number;
  category?: {
    id: number;
    name: string;
  };
  images?: string[];
  mainImage?: string;
  status: 'active' | 'inactive' | 'draft';
  isFeatured: boolean;
  isHot: boolean;
  weight?: number;
  dimensions?: string;
  sku?: string;
  barcode?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  categoryId: number;
  images?: string[];
  mainImage?: string;
  status?: 'active' | 'inactive' | 'draft';
  isFeatured?: boolean;
  isHot?: boolean;
  weight?: number;
  dimensions?: string;
  sku?: string;
  barcode?: string;
  tags?: string[];
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  stock?: number;
  categoryId?: number;
  images?: string[];
  mainImage?: string;
  status?: 'active' | 'inactive' | 'draft';
  isFeatured?: boolean;
  isHot?: boolean;
  weight?: number;
  dimensions?: string;
  sku?: string;
  barcode?: string;
  tags?: string[];
}

export interface ProductListParams {
  page?: number;
  pageSize?: number;
  name?: string;
  categoryId?: number;
  status?: 'active' | 'inactive' | 'draft';
  isFeatured?: boolean;
  isHot?: boolean;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface ProductListResponse {
  data: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 获取商品列表
export async function getProductList(params: ProductListParams = {}) {
  const { 
    page = 1, 
    pageSize = 10, 
    name, 
    categoryId, 
    status, 
    isFeatured, 
    isHot, 
    minPrice, 
    maxPrice, 
    inStock 
  } = params;
  
  const queryParams = new URLSearchParams();
  
  if (page) queryParams.append('page', page.toString());
  if (pageSize) queryParams.append('pageSize', pageSize.toString());
  if (name) queryParams.append('name', name);
  if (categoryId) queryParams.append('categoryId', categoryId.toString());
  if (status) queryParams.append('status', status);
  if (isFeatured !== undefined) queryParams.append('isFeatured', isFeatured.toString());
  if (isHot !== undefined) queryParams.append('isHot', isHot.toString());
  if (minPrice) queryParams.append('minPrice', minPrice.toString());
  if (maxPrice) queryParams.append('maxPrice', maxPrice.toString());
  if (inStock !== undefined) queryParams.append('inStock', inStock.toString());

  const url = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  return request.get<ProductListResponse>(url);
}

// 获取单个商品
export async function getProduct(id: number) {
  return request.get<Product>(`/products/${id}`);
}

// 创建商品
export async function createProduct(data: CreateProductDto) {
  return request.post<Product>('/products', data);
}

// 更新商品
export async function updateProduct(id: number, data: UpdateProductDto) {
  return request.put<Product>(`/products/${id}`, data);
}

// 删除商品
export async function deleteProduct(id: number) {
  return request.delete(`/products/${id}`);
}

// 批量删除商品
export async function batchDeleteProducts(ids: number[]) {
  return request.delete('/products/batch', { data: { ids } });
}

// 切换商品状态
export async function toggleProductStatus(id: number) {
  return request.put<Product>(`/products/${id}/toggle`);
}

// 设置商品为推荐
export async function setProductFeatured(id: number, isFeatured: boolean) {
  return request.put<Product>(`/products/${id}/featured`, { isFeatured });
}

// 设置商品为热门
export async function setProductHot(id: number, isHot: boolean) {
  return request.put<Product>(`/products/${id}/hot`, { isHot });
}

// 更新商品库存
export async function updateProductStock(id: number, stock: number) {
  return request.put<Product>(`/products/${id}/stock`, { stock });
}

// 搜索商品
export async function searchProducts(keyword: string) {
  return request.get<Product[]>(`/products/search?keyword=${encodeURIComponent(keyword)}`);
} 
