import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkSession } from './work-session.entity';

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => WorkSession, (session) => session.attachments)
  @JoinColumn({ name: 'session_id' })
  session: WorkSession;

  @Column({ name: 'attachment_type' })
  attachmentType: 'pr_link' | 'video_link' | 'screenshot' | 'file';

  @Column({ type: 'text' })
  url: string;

  @Column({ nullable: true })
  label?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
