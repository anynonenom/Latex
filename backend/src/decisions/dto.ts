import { IsString } from 'class-validator';

export class CreateDecisionDto {
  @IsString()
  userId: string;

  @IsString()
  problem: string;

  @IsString()
  options: string;

  @IsString()
  chosenSolution: string;

  @IsString()
  reasoning: string;

  @IsString()
  risks: string;
}
