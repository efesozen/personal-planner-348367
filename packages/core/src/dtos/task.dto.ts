import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @MinLength(1)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsBoolean()
  isRecurring!: boolean;

  @IsOptional()
  recurrencePattern?: Record<string, unknown>;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  description?: string | undefined;

  @IsOptional()
  @IsOptional()
  @IsDate()
  dueDate?: Date | undefined;

  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean | undefined;

  @IsOptional()
  @IsOptional()
  recurrencePattern?: Record<string, unknown> | undefined;
}

export class TaskResponseDto {
  id!: string;
  userId!: string;
  title!: string;
  description?: string;
  dueDate?: Date;
  isRecurring!: boolean;
  recurrencePattern?: Record<string, unknown>;
  createdAt!: Date;
  updatedAt!: Date;
}
