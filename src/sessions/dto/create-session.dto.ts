import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SessionStatus } from '@prisma/client';

export class CreateSessionDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  gameId: string;

  @IsNotEmpty()
  gameName: string;

  @IsOptional()
  @IsEnum(SessionStatus)
  status?: SessionStatus;

  @IsOptional()
  @IsString()
  serverId?: string;

  @IsOptional()
  startTime?: Date;

  @IsOptional()
  endTime?: Date;

  @IsOptional()
  webrtcOffer?: string;

  @IsOptional()
  webrtcAnswer?: string;

  @IsOptional()
  iceCandidates?: string;

  @IsOptional()
  metadata?: string;
}