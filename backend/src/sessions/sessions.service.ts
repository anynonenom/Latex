import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from '../entities/attachment.entity';
import { TimeBreakdown } from '../entities/time-breakdown.entity';
import { User } from '../entities/user.entity';
import { WorkSession } from '../entities/work-session.entity';
import { CreateSessionDto } from './dto';

const BLOCKED_THRESHOLD = 60;

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(WorkSession) private sessionsRepo: Repository<WorkSession>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(TimeBreakdown) private timeRepo: Repository<TimeBreakdown>,
    @InjectRepository(Attachment) private attachmentRepo: Repository<Attachment>,
  ) {}

  async create(dto: CreateSessionDto) {
    const user = await this.usersRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const session = this.sessionsRepo.create({
      ...dto,
      user,
      isBlocked: dto.timeBreakdown.blockedTime >= BLOCKED_THRESHOLD,
    });

    const savedSession = await this.sessionsRepo.save(session);
    const timeBreakdown = this.timeRepo.create({ ...dto.timeBreakdown, session: savedSession });
    await this.timeRepo.save(timeBreakdown);

    if (dto.attachments?.length) {
      const attachments = dto.attachments.map((item) => this.attachmentRepo.create({ ...item, session: savedSession }));
      await this.attachmentRepo.save(attachments);
    }

    return this.getById(savedSession.id);
  }

  async list() {
    return this.sessionsRepo.find({ relations: { user: true, timeBreakdown: true, attachments: true } });
  }

  async getById(id: string) {
    const session = await this.sessionsRepo.findOne({ where: { id }, relations: { user: true, timeBreakdown: true, attachments: true } });
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }
}
