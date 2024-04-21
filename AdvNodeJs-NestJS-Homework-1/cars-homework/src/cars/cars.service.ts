import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { CarFilters } from './interfaces/filters-interface';
import { CarinsuranceService } from 'src/carinsurance/carinsurance.service';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private carRepo: Repository<Car>,
    private carInsurenceService: CarinsuranceService,
  ) {}

  getAllCars(filters: CarFilters) {
    const filterConfig: FindManyOptions<Car> = {};

    if (filters.make) {
      filterConfig.where = { make: filters.make };
    }

    if (filters.model) {
      filterConfig.where = { ...filterConfig.where, model: filters.model };
    }
    if (filters.orderBy) {
      if (filters.orderBy === 'year') filterConfig.order = { year: 'ASC' };
    }

    return this.carRepo.find(filterConfig);
  }
  async getCarById(id: string) {
    const foundCar = await this.carRepo.findOne({
      where: { id },
      relations: {
        manufacturer: true,
        carInsurance: true,
      },
    });

    if (!foundCar) throw new NotFoundException('Car Not Found');

    return foundCar;
  }

  async createCar(carData: CreateCarDto) {
    try {
      const { carInsurance, ...data } = carData;

      const newCar = await this.carRepo.save({
        make: data.make,
        model: data.model,
        manufacturer: { id: data.manufacturer },
        year: data.year,
      });

      await this.carInsurenceService.createCarInsurence({
        ...carInsurance,
        car: newCar.id,
      });

      return newCar;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateCar(id: string, updateCarData: UpdateCarDto) {
    const foundCar = await this.getCarById(id);

    Object.assign(foundCar, updateCarData);

    await this.carRepo.save(foundCar);
  }
  async deleteCar(id: string) {
    const foundCar = await this.getCarById(id);

    await this.carRepo.remove(foundCar);
  }
}
