import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from '@saas-template/database';
import type { CreateTaskDto, UpdateTaskDto } from '@saas-template/core';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Task | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateTaskDto): Promise<Task> {
    const task = this.create({
      ...dto,
      userId,
    });
    return this.save(task);
  }

  async update(id: string, userId: string, dto: UpdateTaskDto): Promise<Task | null> {
    const task = await this.findById(id, userId);
    if (!task) {
      return null;
    }

    Object.assign(task, dto);
    return this.save(task);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const task = await this.findById(id, userId);
    if (!task) {
      return false;
    }

    await this.softRemove(task);
    return true;
  }
}
