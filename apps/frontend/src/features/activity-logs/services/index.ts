import { api } from '@/lib/api';
import type { ActivitylogResponseDto, CreateActivitylogDto, UpdateActivitylogDto } from '@saas-template/core';

export const activitylogsService = {
  async getAll(): Promise<ActivitylogResponseDto[]> {
    const response = await api.get('/activitylogs');
    return response.data;
  },

  async getById(id: string): Promise<ActivitylogResponseDto> {
    const response = await api.get(`/activitylogs/${id}`);
    return response.data;
  },

  async create(data: CreateActivitylogDto): Promise<ActivitylogResponseDto> {
    const response = await api.post('/activitylogs', data);
    return response.data;
  },

  async update(id: string, data: UpdateActivitylogDto): Promise<ActivitylogResponseDto> {
    const response = await api.put(`/activitylogs/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/activitylogs/${id}`);
  },
};
