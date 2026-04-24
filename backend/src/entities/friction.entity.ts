import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { WorkSession } from './work-session.entity';

@Entity('frictions')
export class Friction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.frictions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => WorkSession, (session) => session.frictions)
  @JoinColumn({ name: 'session_id' })
  session: WorkSession;

  @Column({ name: 'type' })
  type: 'technical' | 'communication' | 'unclear_spec';

  @Column('text')
  description: string;

  @Column({ name: 'time_lost', type: 'integer' })
  timeLost: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
