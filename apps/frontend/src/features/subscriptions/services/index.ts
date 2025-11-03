import { api } from '@/lib/api';
import type { SubscriptionResponseDto, CreateSubscriptionDto, UpdateSubscriptionDto } from '@saas-template/core';

export const subscriptionsService = {
  async getAll(): Promise<SubscriptionResponseDto[]> {
    const response = await api.get('/subscriptions');
    return response.data;
  },

  async getById(id: string): Promise<SubscriptionResponseDto> {
    const response = await api.get(`/subscriptions/${id}`);
    return response.data;
  },

  async create(data: CreateSubscriptionDto): Promise<SubscriptionResponseDto> {
    const response = await api.post('/subscriptions', data);
    return response.data;
  },

  async update(id: string, data: UpdateSubscriptionDto): Promise<SubscriptionResponseDto> {
    const response = await api.put(`/subscriptions/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/subscriptions/${id}`);
  },
};
