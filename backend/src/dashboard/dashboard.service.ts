import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friction } from '../entities/friction.entity';
import { WorkSession } from '../entities/work-session.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(WorkSession) private sessionsRepo: Repository<WorkSession>,
    @InjectRepository(Friction) private frictionRepo: Repository<Friction>,
  ) {}

  async getDashboard() {
    const sessions = await this.sessionsRepo.find({ relations: { user: true, timeBreakdown: true }, order: { startedAt: 'DESC' }, take: 20 });
    const frictions = await this.frictionRepo.find({ relations: { user: true }, take: 10, order: { createdAt: 'DESC' } });

    const totals = sessions.reduce(
      (acc, session) => {
        acc.coding += session.timeBreakdown?.codingTime ?? 0;
        acc.debugging += session.timeBreakdown?.debuggingTime ?? 0;
        acc.research += session.timeBreakdown?.researchTime ?? 0;
        acc.blocked += session.timeBreakdown?.blockedTime ?? 0;
        return acc;
      },
      { coding: 0, debugging: 0, research: 0, blocked: 0 },
    );

    const teamAnalytics = sessions.reduce<Record<string, { sessionCount: number; confidence: number; blocked: number }>>((acc, session) => {
      const key = session.user.name;
      if (!acc[key]) acc[key] = { sessionCount: 0, confidence: 0, blocked: 0 };
      acc[key].sessionCount += 1;
      acc[key].confidence += session.confidenceLevel;
      acc[key].blocked += session.timeBreakdown?.blockedTime ?? 0;
      return acc;
    }, {});

    return {
      totals,
      workDistribution: [
        { name: 'Coding', value: totals.coding },
        { name: 'Debugging', value: totals.debugging },
        { name: 'Research', value: totals.research },
        { name: 'Blocked', value: totals.blocked },
      ],
      activityFeed: sessions.map((session) => ({
        id: session.id,
        developer: session.user.name,
        type: session.sessionType,
        goal: session.goal,
        blocked: session.isBlocked,
        at: session.startedAt,
      })),
      heatmap: sessions.map((session) => ({
        day: session.startedAt.toISOString().slice(0, 10),
        developer: session.user.name,
        minutes: (session.timeBreakdown?.codingTime ?? 0) + (session.timeBreakdown?.debuggingTime ?? 0),
      })),
      teamAnalytics: Object.entries(teamAnalytics).map(([name, stats]) => ({
        name,
        sessionCount: stats.sessionCount,
        avgConfidence: Number((stats.confidence / stats.sessionCount).toFixed(2)),
        blockedMinutes: stats.blocked,
      })),
      topFrictions: frictions,
    };
  }
}
