import { Controller, Get, Header, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('export')
  @Header('Content-Type', 'application/pdf')
  async exportReport(@Query('from') from: string, @Query('to') to: string, @Res() res: Response) {
    const buffer = await this.reportsService.generate(from, to);
    res.setHeader('Content-Disposition', `attachment; filename=dev-intelligence-${from}-${to}.pdf`);
    res.send(buffer);
  }
}
