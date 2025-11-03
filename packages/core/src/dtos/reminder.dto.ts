import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateReminderDto {
  @IsUUID()
  taskId!: string;

  @IsDate()
  reminderTime!: Date;
}

export class UpdateReminderDto {
  @IsOptional()
  @IsUUID()
  taskId?: string | undefined;

  @IsOptional()
  @IsDate()
  reminderTime?: Date | undefined;
}

export class ReminderResponseDto {
  id!: string;
  taskId!: string;
  reminderTime!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
