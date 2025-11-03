import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Task } from './task.entity';

@Entity({ name: 'reminders' })
export class Reminder extends BaseEntity {
  @Column({ type: 'timestamp with time zone', name: 'reminder_time' })
  @Index('idx_reminders_reminder_time')
  reminderTime!: Date;


@Column({ name: 'task_id' })
  taskId!: string;

  @Index('idx_reminders_task_id')
  @ManyToOne('Task', 'reminders')
  @JoinColumn({ name: 'task_id' })
  task!: Task;
}
