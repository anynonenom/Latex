import { IsEnum, IsInt, IsString, Min } from 'class-validator';

export class CreateFrictionDto {
  @IsString()
  userId: string;

  @IsString()
  sessionId: string;

  @IsEnum(['technical', 'communication', 'unclear_spec'])
  type: 'technical' | 'communication' | 'unclear_spec';

  @IsString()
  description: string;

  @IsInt()
  @Min(0)
  timeLost: number;
}
