import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateActivitylogDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @MinLength(1)
  action!: string;

  @IsDate()
  timestamp!: Date;
}

export class UpdateActivitylogDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  action?: string | undefined;

  @IsOptional()
  @IsDate()
  timestamp?: Date | undefined;
}

export class ActivitylogResponseDto {
  id!: string;
  userId!: string;
  action!: string;
  timestamp!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
