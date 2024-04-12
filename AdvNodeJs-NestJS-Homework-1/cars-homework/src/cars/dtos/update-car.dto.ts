import { IsString, IsNumber, Length, IsOptional } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  make: string;

  @IsString()
  @Length(2, 20)
  @IsOptional()
  model: string;

  @IsNumber()
  @IsOptional()
  year: number;
}
