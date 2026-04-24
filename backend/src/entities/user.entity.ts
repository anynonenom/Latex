import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Decision } from './decision.entity';
import { Friction } from './friction.entity';
import { WorkSession } from './work-session.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  passwordHash: string;

  @Column({ default: 'developer' })
  role: 'developer' | 'manager' | 'admin';

  @OneToMany(() => WorkSession, (session) => session.user)
  sessions: WorkSession[];

  @OneToMany(() => Decision, (decision) => decision.user)
  decisions: Decision[];

  @OneToMany(() => Friction, (friction) => friction.user)
  frictions: Friction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
