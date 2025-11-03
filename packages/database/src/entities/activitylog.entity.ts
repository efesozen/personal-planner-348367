import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'activity_logs' })
export class Activitylog extends BaseEntity {
  @Column()
  action!: string;

  @Column({ type: 'timestamp with time zone' })
  @Index('idx_activity_logs_timestamp')
  timestamp!: Date;


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_activity_logs_user_id')
  @ManyToOne('User', 'activitylogs')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
