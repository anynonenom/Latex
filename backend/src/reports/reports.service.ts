import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PDFDocument from 'pdfkit';
import { Between, Repository } from 'typeorm';
import { Decision } from '../entities/decision.entity';
import { Friction } from '../entities/friction.entity';
import { WorkSession } from '../entities/work-session.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(WorkSession) private sessionsRepo: Repository<WorkSession>,
    @InjectRepository(Decision) private decisionsRepo: Repository<Decision>,
    @InjectRepository(Friction) private frictionsRepo: Repository<Friction>,
  ) {}

  async generate(from: string, to: string) {
    const start = new Date(from);
    const end = new Date(to);

    const sessions = await this.sessionsRepo.find({
      where: { startedAt: Between(start, end) },
      relations: { user: true, timeBreakdown: true },
    });
    const decisions = await this.decisionsRepo.find({ where: { createdAt: Between(start, end) }, relations: { user: true } });
    const frictions = await this.frictionsRepo.find({ where: { createdAt: Between(start, end) }, relations: { user: true } });

    const doc = new PDFDocument({ margin: 40 });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    doc.fontSize(18).text('DEV Intelligence Report');
    doc.fontSize(11).text(`Range: ${from} to ${to}`);
    doc.moveDown();

    doc.fontSize(14).text('Sessions Summary');
    sessions.forEach((session) => {
      doc.fontSize(10).text(`- ${session.user.name} | ${session.sessionType} | Confidence ${session.confidenceLevel}/10`);
    });

    doc.moveDown().fontSize(14).text('Decisions');
    decisions.forEach((decision) => {
      doc.fontSize(10).text(`- ${decision.user.name}: ${decision.problem} -> ${decision.chosenSolution}`);
    });

    doc.moveDown().fontSize(14).text('Frictions');
    frictions.forEach((friction) => {
      doc.fontSize(10).text(`- ${friction.user.name}: ${friction.type} (${friction.timeLost}m)`);
    });

    const timeTotals = sessions.reduce(
      (acc, session) => {
        acc.coding += session.timeBreakdown?.codingTime ?? 0;
        acc.debugging += session.timeBreakdown?.debuggingTime ?? 0;
        acc.research += session.timeBreakdown?.researchTime ?? 0;
        acc.blocked += session.timeBreakdown?.blockedTime ?? 0;
        return acc;
      },
      { coding: 0, debugging: 0, research: 0, blocked: 0 },
    );

    doc.moveDown().fontSize(14).text('Time Breakdown (minutes)');
    doc.fontSize(10).text(
      `Coding: ${timeTotals.coding} | Debugging: ${timeTotals.debugging} | Research: ${timeTotals.research} | Blocked: ${timeTotals.blocked}`,
    );

    doc.end();
    await new Promise((resolve) => doc.on('end', resolve));
    return Buffer.concat(chunks);
  }
}
