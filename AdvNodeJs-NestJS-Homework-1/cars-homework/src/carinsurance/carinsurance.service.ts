import { Injectable, NotFoundException } from '@nestjs/common';
import { CarInsurance } from './entities/car-insurance.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarInsurenceDto } from './dtos/create-carinsurence.dto';
import { UpdateCarInsurenceDto } from './dtos/update-carinsurence.dto';

@Injectable()
export class CarinsuranceService {
  constructor(
    @InjectRepository(CarInsurance)
    private carInsurencesRepo: Repository<CarInsurance>,
  ) {}

  getAllCarInsurances() {
    return this.carInsurencesRepo.find({ loadRelationIds: true });
  }

  getCarInsurenceById(id: string) {
    const foundCarInsurence = this.carInsurencesRepo.findOne({
      where: { id },
      relations: {
        car: true,
      },
    });

    if (!foundCarInsurence)
      throw new NotFoundException('CarInsurence Not Found');

    return foundCarInsurence;
  }

  async createCarInsurence(carInsuranceData: CreateCarInsurenceDto) {
    const newCarInsurence = this.carInsurencesRepo.create({
      ...carInsuranceData,
      car: { id: carInsuranceData.car },
    });

    await this.carInsurencesRepo.save(newCarInsurence);
  }

  async updateCarInsurence(
    id: string,
    updateCarInsurenceData: UpdateCarInsurenceDto,
  ) {
    const foundCarInsurence = await this.getCarInsurenceById(id);

    Object.assign(foundCarInsurence, updateCarInsurenceData);

    await this.carInsurencesRepo.save(foundCarInsurence);
  }

  async deleteCarInsurence(id: string) {
    const foundCarInsurence = await this.getCarInsurenceById(id);

    await this.carInsurencesRepo.remove(foundCarInsurence);
  }
}
