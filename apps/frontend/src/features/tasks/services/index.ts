import { api } from '@/lib/api';
import type { TaskResponseDto, CreateTaskDto, UpdateTaskDto } from '@saas-template/core';

export const tasksService = {
  async getAll(): Promise<TaskResponseDto[]> {
    const response = await api.get('/tasks');
    return response.data;
  },

  async getById(id: string): Promise<TaskResponseDto> {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  async create(data: CreateTaskDto): Promise<TaskResponseDto> {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  async update(id: string, data: UpdateTaskDto): Promise<TaskResponseDto> {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
