import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activitylog } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { ActivitylogsController } from './activitylogs.controller';
import { ActivitylogsService } from './activitylogs.service';
import { ActivitylogsRepository } from './activitylogs.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activitylog]),
    DatabaseModule,
  ],
  controllers: [ActivitylogsController],
  providers: [ActivitylogsService, ActivitylogsRepository],
  exports: [ActivitylogsService],
})
export class ActivitylogsModule {}
