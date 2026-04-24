import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friction } from '../entities/friction.entity';
import { User } from '../entities/user.entity';
import { WorkSession } from '../entities/work-session.entity';
import { FrictionsController } from './frictions.controller';
import { FrictionsService } from './frictions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Friction, User, WorkSession])],
  providers: [FrictionsService],
  controllers: [FrictionsController],
})
export class FrictionsModule {}
