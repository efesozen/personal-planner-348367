import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum SubscriptionPlan {
  FREE = 'FREE',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE'
}

export class CreateSubscriptionDto {
  @IsUUID()
  userId!: string;

  @IsEnum(SubscriptionPlan)
  plan!: SubscriptionPlan;

  @IsDate()
  startDate!: Date;

  @IsDate()
  endDate!: Date;

  @IsBoolean()
  isActive!: boolean;
}

export class UpdateSubscriptionDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsEnum(SubscriptionPlan)
  plan?: SubscriptionPlan | undefined;

  @IsOptional()
  @IsDate()
  startDate?: Date | undefined;

  @IsOptional()
  @IsDate()
  endDate?: Date | undefined;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean | undefined;
}

export class SubscriptionResponseDto {
  id!: string;
  userId!: string;
  plan!: SubscriptionPlan;
  startDate!: Date;
  endDate!: Date;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
