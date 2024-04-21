import { IsArray, IsString, Length } from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  @Length(3, 30)
  name: string;

  @IsString()
  @Length(3, 30)
  headquarters: string;
}
