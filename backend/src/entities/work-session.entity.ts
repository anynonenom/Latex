import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Attachment } from './attachment.entity';
import { Friction } from './friction.entity';
import { TimeBreakdown } from './time-breakdown.entity';
import { User } from './user.entity';

@Entity('work_sessions')
@Check('confidence_level BETWEEN 1 AND 10')
@Check('energy_level BETWEEN 1 AND 10')
export class WorkSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.sessions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'session_type' })
  sessionType: 'debugging' | 'feature' | 'research' | 'meeting';

  @Column('text')
  goal: string;

  @Column('text')
  reality: string;

  @Column({ name: 'decision_taken', type: 'text' })
  decisionTaken: string;

  @Column({ name: 'alternatives_considered', type: 'text' })
  alternativesConsidered: string;

  @Column({ name: 'final_reason', type: 'text' })
  finalReason: string;

  @Column({ type: 'text' })
  friction: string;

  @Column({ name: 'confidence_level', type: 'smallint' })
  confidenceLevel: number;

  @Column({ name: 'energy_level', type: 'smallint' })
  energyLevel: number;

  @Column({ name: 'is_blocked', default: false })
  isBlocked: boolean;

  @OneToOne(() => TimeBreakdown, (timeBreakdown) => timeBreakdown.session, { cascade: true })
  timeBreakdown: TimeBreakdown;

  @OneToMany(() => Attachment, (attachment) => attachment.session, { cascade: true })
  attachments: Attachment[];

  @OneToMany(() => Friction, (friction) => friction.session)
  frictions: Friction[];

  @CreateDateColumn({ name: 'started_at' })
  startedAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
