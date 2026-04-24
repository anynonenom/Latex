import { Check, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkSession } from './work-session.entity';

@Entity('time_breakdowns')
@Check('coding_time >= 0 AND debugging_time >= 0 AND research_time >= 0 AND blocked_time >= 0')
export class TimeBreakdown {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => WorkSession, (session) => session.timeBreakdown)
  @JoinColumn({ name: 'session_id' })
  session: WorkSession;

  @Column({ name: 'coding_time', type: 'integer', default: 0 })
  codingTime: number;

  @Column({ name: 'debugging_time', type: 'integer', default: 0 })
  debuggingTime: number;

  @Column({ name: 'research_time', type: 'integer', default: 0 })
  researchTime: number;

  @Column({ name: 'blocked_time', type: 'integer', default: 0 })
  blockedTime: number;
}
