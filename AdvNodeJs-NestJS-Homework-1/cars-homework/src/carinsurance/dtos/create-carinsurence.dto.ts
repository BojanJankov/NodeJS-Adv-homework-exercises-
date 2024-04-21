import { IsOptional, IsString, Length, Validate } from 'class-validator';

export class CreateCarInsurenceDto {
  @IsString()
  @Length(3, 30)
  policyNumber: string;

  @IsString()
  @Length(3, 30)
  provider: string;

  @IsString()
  @Length(3, 30)
  coverageDetalis: string;

  @IsString()
  @IsOptional()
  car: string;
}
