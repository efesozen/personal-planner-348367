import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateReminderDto, ReminderResponseDto, UpdateReminderDto } from '@saas-template/core';
import type { Reminder } from '@saas-template/database';
import { RemindersRepository } from './reminders.repository';

@Injectable()
export class RemindersService {
  constructor(
    private readonly remindersRepository: RemindersRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ReminderResponseDto[]> {
    const reminders = await this.remindersRepository.findAll(userId);
    return reminders.map((reminder: Reminder) => this.toResponseDto(reminder));
  }

  async findOne(id: string, userId: string): Promise<ReminderResponseDto> {
    const reminder = await this.remindersRepository.findById(id, userId);
    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }
    return this.toResponseDto(reminder);
  }

  async create(userId: string, dto: CreateReminderDto): Promise<ReminderResponseDto> {
    return this.uow.execute(async () => {
      const reminder = await this.remindersRepository.create(userId, dto);
      return this.toResponseDto(reminder);
    });
  }

  async update(id: string, userId: string, dto: UpdateReminderDto): Promise<ReminderResponseDto> {
    return this.uow.execute(async () => {
      const reminder = await this.remindersRepository.update(id, userId, dto);
      if (!reminder) {
        throw new NotFoundException('Reminder not found');
      }
      return this.toResponseDto(reminder);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.remindersRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Reminder not found');
      }
    });
  }

  private toResponseDto(reminder: Reminder): ReminderResponseDto {
    return {
      id: reminder.id,
      taskId: reminder.taskId,
      reminderTime: reminder.reminderTime,
      createdAt: reminder.createdAt,
      updatedAt: reminder.updatedAt,
    };
  }
}
