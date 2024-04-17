import { IsString, IsNumber, Length } from 'class-validator';

export class CreateCarDto {
  @IsString()
  make: string;

  @IsString()
  @Length(2, 20)
  model: string;

  @IsNumber()
  year: number;
}
