import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFrictionDto } from './dto';
import { FrictionsService } from './frictions.service';

@Controller('frictions')
export class FrictionsController {
  constructor(private readonly frictionsService: FrictionsService) {}

  @Post()
  create(@Body() dto: CreateFrictionDto) {
    return this.frictionsService.create(dto);
  }

  @Get()
  list() {
    return this.frictionsService.list();
  }
}
