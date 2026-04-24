import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDecisionDto } from './dto';
import { Decision } from '../entities/decision.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class DecisionsService {
  constructor(
    @InjectRepository(Decision) private decisionsRepo: Repository<Decision>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  async create(dto: CreateDecisionDto) {
    const user = await this.usersRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');
    const decision = this.decisionsRepo.create({ ...dto, user });
    return this.decisionsRepo.save(decision);
  }

  list() {
    return this.decisionsRepo.find({ relations: { user: true }, order: { createdAt: 'DESC' } });
  }
}
