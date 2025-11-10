import { IsNotEmpty, IsOptional, IsString, IsNumber, IsInt, Min } from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  duration: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  maxSessions: number;

  @IsOptional()
  @IsString()
  features?: string;
}