import { api } from '@/lib/api';
import type { ReminderResponseDto, CreateReminderDto, UpdateReminderDto } from '@saas-template/core';

export const remindersService = {
  async getAll(): Promise<ReminderResponseDto[]> {
    const response = await api.get('/reminders');
    return response.data;
  },

  async getById(id: string): Promise<ReminderResponseDto> {
    const response = await api.get(`/reminders/${id}`);
    return response.data;
  },

  async create(data: CreateReminderDto): Promise<ReminderResponseDto> {
    const response = await api.post('/reminders', data);
    return response.data;
  },

  async update(id: string, data: UpdateReminderDto): Promise<ReminderResponseDto> {
    const response = await api.put(`/reminders/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/reminders/${id}`);
  },
};
