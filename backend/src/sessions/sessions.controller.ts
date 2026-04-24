import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSessionDto } from './dto';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body() dto: CreateSessionDto) {
    return this.sessionsService.create(dto);
  }

  @Get()
  list() {
    return this.sessionsService.list();
  }
}
