import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Reminder } from '@saas-template/database';
import type { CreateReminderDto, UpdateReminderDto } from '@saas-template/core';

@Injectable()
export class RemindersRepository extends Repository<Reminder> {
  constructor(private dataSource: DataSource) {
    super(Reminder, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Reminder[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Reminder | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateReminderDto): Promise<Reminder> {
    const reminder = this.create({
      ...dto,
      userId,
    });
    return this.save(reminder);
  }

  async update(id: string, userId: string, dto: UpdateReminderDto): Promise<Reminder | null> {
    const reminder = await this.findById(id, userId);
    if (!reminder) {
      return null;
    }

    Object.assign(reminder, dto);
    return this.save(reminder);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const reminder = await this.findById(id, userId);
    if (!reminder) {
      return false;
    }

    await this.softRemove(reminder);
    return true;
  }
}
