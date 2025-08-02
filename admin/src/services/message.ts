import { request } from '@/lib/axios';

export interface Message {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  productInterest?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessageDto {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  productInterest?: string;
  message: string;
}

export interface UpdateMessageDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  productInterest?: string;
  message?: string;
}

export interface MessageListParams {
  page?: number;
  pageSize?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  productInterest?: string;
}

export interface MessageListResponse {
  data: Message[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 获取留言列表
export async function getMessageList(params: MessageListParams = {}) {
  const { 
    page = 1, 
    pageSize = 10, 
    firstName, 
    lastName, 
    email, 
    company, 
    productInterest 
  } = params;

  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('pageSize', pageSize.toString());
  
  if (firstName) queryParams.append('firstName', firstName);
  if (lastName) queryParams.append('lastName', lastName);
  if (email) queryParams.append('email', email);
  if (company) queryParams.append('company', company);
  if (productInterest) queryParams.append('productInterest', productInterest);

  return request.get(`/messages?${queryParams.toString()}`);
}

// 获取单个留言
export async function getMessage(id: number) {
  return request.get(`/messages/${id}`);
}

// 创建留言
export async function createMessage(data: CreateMessageDto) {
  return request.post('/messages', data);
}

// 更新留言
export async function updateMessage(id: number, data: UpdateMessageDto) {
  return request.put(`/messages/${id}`, data);
}

// 删除留言
export async function deleteMessage(id: number) {
  return request.delete(`/messages/${id}`);
}

// 批量删除留言
export async function batchDeleteMessages(ids: number[]) {
  return request.delete('/messages/batch', { data: { ids } });
} 
