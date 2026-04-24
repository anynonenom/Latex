import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Decision } from '../entities/decision.entity';
import { Friction } from '../entities/friction.entity';
import { WorkSession } from '../entities/work-session.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkSession, Decision, Friction])],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
