import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateTaskDto, TaskResponseDto, UpdateTaskDto } from '@saas-template/core';
import type { Task } from '@saas-template/database';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksRepository.findAll(userId);
    return tasks.map((task: Task) => this.toResponseDto(task));
  }

  async findOne(id: string, userId: string): Promise<TaskResponseDto> {
    const task = await this.tasksRepository.findById(id, userId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.toResponseDto(task);
  }

  async create(userId: string, dto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.uow.execute(async () => {
      const task = await this.tasksRepository.create(userId, dto);
      return this.toResponseDto(task);
    });
  }

  async update(id: string, userId: string, dto: UpdateTaskDto): Promise<TaskResponseDto> {
    return this.uow.execute(async () => {
      const task = await this.tasksRepository.update(id, userId, dto);
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      return this.toResponseDto(task);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.tasksRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Task not found');
      }
    });
  }

  private toResponseDto(task: Task): TaskResponseDto {
    return {
      id: task.id,
      userId: task.userId,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      isRecurring: task.isRecurring,
      recurrencePattern: task.recurrencePattern,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
