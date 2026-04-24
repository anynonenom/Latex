import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Friction } from '../entities/friction.entity';
import { TimeBreakdown } from '../entities/time-breakdown.entity';
import { User } from '../entities/user.entity';
import { WorkSession } from '../entities/work-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkSession, TimeBreakdown, User, Friction])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
