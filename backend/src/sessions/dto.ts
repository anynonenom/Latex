import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';

class CreateTimeBreakdownDto {
  @IsInt()
  @Min(0)
  codingTime: number;

  @IsInt()
  @Min(0)
  debuggingTime: number;

  @IsInt()
  @Min(0)
  researchTime: number;

  @IsInt()
  @Min(0)
  blockedTime: number;
}

class CreateAttachmentDto {
  @IsEnum(['pr_link', 'video_link', 'screenshot', 'file'])
  attachmentType: 'pr_link' | 'video_link' | 'screenshot' | 'file';

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  label?: string;
}

export class CreateSessionDto {
  @IsString()
  userId: string;

  @IsEnum(['debugging', 'feature', 'research', 'meeting'])
  sessionType: 'debugging' | 'feature' | 'research' | 'meeting';

  @IsString()
  goal: string;

  @IsString()
  reality: string;

  @IsString()
  decisionTaken: string;

  @IsString()
  alternativesConsidered: string;

  @IsString()
  finalReason: string;

  @IsString()
  friction: string;

  @IsInt()
  @Min(1)
  @Max(10)
  confidenceLevel: number;

  @IsInt()
  @Min(1)
  @Max(10)
  energyLevel: number;

  @ValidateNested()
  @Type(() => CreateTimeBreakdownDto)
  timeBreakdown: CreateTimeBreakdownDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAttachmentDto)
  attachments?: CreateAttachmentDto[];
}
