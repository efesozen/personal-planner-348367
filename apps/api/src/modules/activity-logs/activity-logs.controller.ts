import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { CreateActivitylogDto, ActivitylogResponseDto, UpdateActivitylogDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActivitylogsService } from './activitylogs.service';

@Controller('activitylogs')
@UseGuards(JwtAuthGuard)
export class ActivitylogsController {
  constructor(private readonly activitylogsService: ActivitylogsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<ActivitylogResponseDto[]> {
    return this.activitylogsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<ActivitylogResponseDto> {
    return this.activitylogsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateActivitylogDto,
    @CurrentUser() user: User
  ): Promise<ActivitylogResponseDto> {
    return this.activitylogsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateActivitylogDto,
    @CurrentUser() user: User
  ): Promise<ActivitylogResponseDto> {
    return this.activitylogsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.activitylogsService.remove(id, user.id);
  }
}
