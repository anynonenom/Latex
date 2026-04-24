import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecisionsController } from './decisions.controller';
import { DecisionsService } from './decisions.service';
import { Decision } from '../entities/decision.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Decision, User])],
  providers: [DecisionsService],
  controllers: [DecisionsController],
})
export class DecisionsModule {}
