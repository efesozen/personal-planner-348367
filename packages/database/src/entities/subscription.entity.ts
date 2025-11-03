import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'subscriptions' })
export class Subscription extends BaseEntity {
  @Column({ type: 'enum', enum: ['FREE', 'PRO', 'ENTERPRISE'] })
  plan!: 'FREE' | 'PRO' | 'ENTERPRISE';

  @Column({ type: 'timestamp with time zone', name: 'start_date' })
  @Index('idx_subscriptions_start_date')
  startDate!: Date;

  @Column({ type: 'timestamp with time zone', name: 'end_date' })
  endDate!: Date;

  @Column({ type: 'boolean', name: 'is_active' })
  isActive!: boolean;

}
