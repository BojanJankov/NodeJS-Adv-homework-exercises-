import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateCarInsurenceDto } from 'src/carinsurance/dtos/create-carinsurence.dto';
import { CarInsurance } from 'src/carinsurance/entities/car-insurance.entity';
import { Manufacturer } from 'src/manufacturer/entitites/manufacturer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.cars)
  @JoinColumn()
  manufacturer: Manufacturer;

  @ValidateNested()
  @Type(() => CreateCarInsurenceDto)
  @OneToOne(() => CarInsurance, (carInsurance) => carInsurance.car)
  carInsurance: CreateCarInsurenceDto;
}
