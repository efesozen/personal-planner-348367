import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Subscription } from '@saas-template/database';
import type { CreateSubscriptionDto, UpdateSubscriptionDto } from '@saas-template/core';

@Injectable()
export class SubscriptionsRepository extends Repository<Subscription> {
  constructor(private dataSource: DataSource) {
    super(Subscription, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Subscription[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Subscription | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateSubscriptionDto): Promise<Subscription> {
    const subscription = this.create({
      ...dto,
      userId,
    });
    return this.save(subscription);
  }

  async update(id: string, userId: string, dto: UpdateSubscriptionDto): Promise<Subscription | null> {
    const subscription = await this.findById(id, userId);
    if (!subscription) {
      return null;
    }

    Object.assign(subscription, dto);
    return this.save(subscription);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const subscription = await this.findById(id, userId);
    if (!subscription) {
      return false;
    }

    await this.softRemove(subscription);
    return true;
  }
}
