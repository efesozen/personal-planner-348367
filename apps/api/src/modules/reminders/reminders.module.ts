import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reminder } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';
import { RemindersRepository } from './reminders.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reminder]),
    DatabaseModule,
  ],
  controllers: [RemindersController],
  providers: [RemindersService, RemindersRepository],
  exports: [RemindersService],
})
export class RemindersModule {}
