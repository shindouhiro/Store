import { request } from '@/lib/axios';

export type ContactType = 'location' | 'phone' | 'email' | 'social';

export interface ContactInfo {
  id: number;
  type: ContactType;
  title: string;
  icon?: string | null;
  gradient?: string | null;
  detailsJson?: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactDto {
  type: ContactType;
  title: string;
  icon?: string;
  gradient?: string;
  detailsJson?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export type UpdateContactDto = Partial<CreateContactDto>;

export interface ContactListResponse {
  data: ContactInfo[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getContactList(params: { page?: number; pageSize?: number } = {}) {
  const { page = 1, pageSize = 10 } = params;
  const query = new URLSearchParams({ page: String(page), pageSize: String(pageSize) }).toString();
  return request.get<ContactListResponse>(`/contact?${query}`);
}

export async function createContact(data: CreateContactDto) {
  return request.post<ContactInfo>('/contact', data);
}

export async function updateContact(id: number, data: UpdateContactDto) {
  return request.put<ContactInfo>(`/contact/${id}`, data);
}

export async function deleteContact(id: number) {
  return request.delete(`/contact/${id}`);
}


