import { request } from '@/lib/axios';

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  products?: Array<{ id: number; name: string }>;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  icon?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  icon?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface CategoryListParams {
  page?: number;
  pageSize?: number;
  active?: boolean;
}

export interface CategoryListResponse {
  data: Category[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 获取分类列表
export async function getCategoryList(params: CategoryListParams = {}) {
  const { page = 1, pageSize = 10, active } = params;
  const queryParams = new URLSearchParams();
  
  if (page) queryParams.append('page', page.toString());
  if (pageSize) queryParams.append('pageSize', pageSize.toString());
  if (active !== undefined) queryParams.append('active', active.toString());

  const url = `/categories${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  return request.get<CategoryListResponse>(url);
}

// 获取所有分类（不分页）
export async function getAllCategories() {
  return request.get<Category[]>('/categories');
}

// 获取启用的分类
export async function getActiveCategories() {
  return request.get<Category[]>('/categories?active=true');
}

// 搜索分类
export async function searchCategories(keyword: string) {
  return request.get<Category[]>(`/categories/search?keyword=${encodeURIComponent(keyword)}`);
}

// 获取单个分类
export async function getCategory(id: number) {
  return request.get<Category>(`/categories/${id}`);
}

// 创建分类
export async function createCategory(data: CreateCategoryDto) {
  return request.post<Category>('/categories', data);
}

// 更新分类
export async function updateCategory(id: number, data: UpdateCategoryDto) {
  return request.put<Category>(`/categories/${id}`, data);
}

// 删除分类
export async function deleteCategory(id: number) {
  return request.delete(`/categories/${id}`);
}

// 切换分类状态
export async function toggleCategoryStatus(id: number) {
  return request.put<Category>(`/categories/${id}/toggle`);
}

// 更新分类排序
export async function updateCategorySortOrder(id: number, sortOrder: number) {
  return request.put<Category>(`/categories/${id}/sort?sortOrder=${sortOrder}`);
} 
