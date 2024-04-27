import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature, FindManyOptions, Repository } from 'typeorm';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { CarFilters } from './interfaces/filters-interface';
import { CarinsuranceService } from 'src/carinsurance/carinsurance.service';
import { CreateFeatureDto } from 'src/feature/dtos/create-feature.dto';
import { FeatureService } from 'src/feature/feature.service';
import { AddFeatureToCarDto } from './dtos/add-feature-car.dto';
import { features } from 'process';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private carRepo: Repository<Car>,
    private carInsurenceService: CarinsuranceService,
    private featureService: FeatureService,
  ) {}

  async getAllCars(filters: CarFilters) {
    const filterConfig: FindManyOptions<Car> = {};

    filterConfig.take = filters.maxResults;
    filterConfig.skip = filters.firstResult;

    if (filters.make) {
      filterConfig.where = { make: filters.make };
    }

    if (filters.model) {
      filterConfig.where = { ...filterConfig.where, model: filters.model };
    }
    if (filters.orderBy) {
      if (filters.orderBy === 'year') filterConfig.order = { year: 'ASC' };
    }

    const cars = await this.carRepo.find(filterConfig);
    const count = await this.carRepo.count();

    return {
      cars,
      totalRecords: count,
    };
  }

  async getCarById(id: string) {
    const foundCar = await this.carRepo.findOne({
      where: { id },
      relations: {
        manufacturer: true,
        carInsurance: true,
        features: true,
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

  async addFeatureToCar(id: string, addFeatureToCar: AddFeatureToCarDto) {
    const foundCar = await this.getCarById(id);

    await this.carRepo.save({
      ...foundCar,
      features: [...foundCar.features, { id: addFeatureToCar.feature }],
    });
  }

  async listAllFeaturesOfCar(id: string) {
    const foundCar = await this.getCarById(id);

    return foundCar.features;
  }

  async deleteFeatureOfCar(carId: string, featureId: string) {
    const foundCar = await this.getCarById(carId);

    foundCar.features = foundCar.features.filter(
      (feature) => feature.id !== featureId,
    );

    await this.carRepo.save(foundCar);
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
