import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('decisions')
export class Decision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.decisions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('text')
  problem: string;

  @Column('text')
  options: string;

  @Column({ name: 'chosen_solution', type: 'text' })
  chosenSolution: string;

  @Column('text')
  reasoning: string;

  @Column('text')
  risks: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
