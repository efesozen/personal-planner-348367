import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'timestamp with time zone', nullable: true, name: 'due_date' })
  @Index('idx_tasks_due_date')
  dueDate?: Date;

  @Column({ type: 'boolean', name: 'is_recurring' })
  isRecurring!: boolean;

  @Column({ type: 'jsonb', nullable: true, name: 'recurrence_pattern' })
  recurrencePattern?: Record<string, unknown>;


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_tasks_user_id')
  @ManyToOne('User', 'tasks')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
