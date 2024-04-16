import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { CarFilters } from './interfaces/filters-interface';
import { filter } from 'rxjs';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carRepo: Repository<Car>) {}

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
  async getCarById(id: number) {
    const foundCar = await this.carRepo.findOneBy({ id });

    if (!foundCar) throw new NotFoundException('Car Not Found');

    return foundCar;
  }

  createCar(carData: CreateCarDto) {
    return this.carRepo.save(carData);
  }
  async updateCar(id: number, updateCarData: UpdateCarDto) {
    const foundCar = await this.getCarById(id);

    Object.assign(foundCar, updateCarData);

    await this.carRepo.save(foundCar);
  }
  async deleteCar(id: number) {
    const foundCar = await this.getCarById(id);

    await this.carRepo.remove(foundCar);
  }
}
