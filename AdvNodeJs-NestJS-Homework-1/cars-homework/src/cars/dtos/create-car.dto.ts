import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Length,
  IsOptional,
  IsObject,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { CreateCarInsurenceDto } from 'src/carinsurance/dtos/create-carinsurence.dto';

export class CreateCarDto {
  @IsString()
  make: string;

  @IsString()
  @Length(2, 20)
  model: string;

  @IsString()
  manufacturer: string;

  @IsNumber()
  year: number;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateCarInsurenceDto)
  carInsurance: CreateCarInsurenceDto;
}
