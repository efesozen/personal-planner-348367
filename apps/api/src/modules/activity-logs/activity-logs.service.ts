import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateActivitylogDto, ActivitylogResponseDto, UpdateActivitylogDto } from '@saas-template/core';
import type { Activitylog } from '@saas-template/database';
import { ActivitylogsRepository } from './activitylogs.repository';

@Injectable()
export class ActivitylogsService {
  constructor(
    private readonly activitylogsRepository: ActivitylogsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ActivitylogResponseDto[]> {
    const activitylogs = await this.activitylogsRepository.findAll(userId);
    return activitylogs.map((activitylog: Activitylog) => this.toResponseDto(activitylog));
  }

  async findOne(id: string, userId: string): Promise<ActivitylogResponseDto> {
    const activitylog = await this.activitylogsRepository.findById(id, userId);
    if (!activitylog) {
      throw new NotFoundException('Activitylog not found');
    }
    return this.toResponseDto(activitylog);
  }

  async create(userId: string, dto: CreateActivitylogDto): Promise<ActivitylogResponseDto> {
    return this.uow.execute(async () => {
      const activitylog = await this.activitylogsRepository.create(userId, dto);
      return this.toResponseDto(activitylog);
    });
  }

  async update(id: string, userId: string, dto: UpdateActivitylogDto): Promise<ActivitylogResponseDto> {
    return this.uow.execute(async () => {
      const activitylog = await this.activitylogsRepository.update(id, userId, dto);
      if (!activitylog) {
        throw new NotFoundException('Activitylog not found');
      }
      return this.toResponseDto(activitylog);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.activitylogsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Activitylog not found');
      }
    });
  }

  private toResponseDto(activitylog: Activitylog): ActivitylogResponseDto {
    return {
      id: activitylog.id,
      userId: activitylog.userId,
      action: activitylog.action,
      timestamp: activitylog.timestamp,
      createdAt: activitylog.createdAt,
      updatedAt: activitylog.updatedAt,
    };
  }
}
