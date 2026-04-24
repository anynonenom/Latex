import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friction } from '../entities/friction.entity';
import { User } from '../entities/user.entity';
import { WorkSession } from '../entities/work-session.entity';
import { CreateFrictionDto } from './dto';

@Injectable()
export class FrictionsService {
  constructor(
    @InjectRepository(Friction) private frictionsRepo: Repository<Friction>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(WorkSession) private sessionsRepo: Repository<WorkSession>,
  ) {}

  async create(dto: CreateFrictionDto) {
    const user = await this.usersRepo.findOne({ where: { id: dto.userId } });
    const session = await this.sessionsRepo.findOne({ where: { id: dto.sessionId } });
    if (!user || !session) throw new NotFoundException('User or session not found');
    const friction = this.frictionsRepo.create({ ...dto, user, session });
    return this.frictionsRepo.save(friction);
  }

  list() {
    return this.frictionsRepo.find({ relations: { user: true, session: true }, order: { createdAt: 'DESC' } });
  }
}
