import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Activitylog } from '@saas-template/database';
import type { CreateActivitylogDto, UpdateActivitylogDto } from '@saas-template/core';

@Injectable()
export class ActivitylogsRepository extends Repository<Activitylog> {
  constructor(private dataSource: DataSource) {
    super(Activitylog, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Activitylog[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Activitylog | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateActivitylogDto): Promise<Activitylog> {
    const activitylog = this.create({
      ...dto,
      userId,
    });
    return this.save(activitylog);
  }

  async update(id: string, userId: string, dto: UpdateActivitylogDto): Promise<Activitylog | null> {
    const activitylog = await this.findById(id, userId);
    if (!activitylog) {
      return null;
    }

    Object.assign(activitylog, dto);
    return this.save(activitylog);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const activitylog = await this.findById(id, userId);
    if (!activitylog) {
      return false;
    }

    await this.softRemove(activitylog);
    return true;
  }
}
