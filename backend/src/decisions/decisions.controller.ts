import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDecisionDto } from './dto';
import { DecisionsService } from './decisions.service';

@Controller('decisions')
export class DecisionsController {
  constructor(private readonly decisionsService: DecisionsService) {}

  @Post()
  create(@Body() dto: CreateDecisionDto) {
    return this.decisionsService.create(dto);
  }

  @Get()
  list() {
    return this.decisionsService.list();
  }
}
