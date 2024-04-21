import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { CarFilters } from './interfaces/filters-interface';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getAllCars(
    @Query('make') make: string,
    @Query('model') model: string,
    @Query('orderBy') orderBy: 'year',
  ) {
    const filters: CarFilters = {
      make,
      model,
      orderBy,
    };
    return this.carsService.getAllCars(filters);
  }

  @Get('/:id')
  getCarById(@Param('id') id: string) {
    return this.carsService.getCarById(id);
  }

  @Post()
  createCar(@Body() carData: CreateCarDto) {
    return this.carsService.createCar(carData);
  }
  @Patch('/:id')
  updateCar(@Param('id') id: string, @Body() updateCarData: UpdateCarDto) {
    return this.carsService.updateCar(id, updateCarData);
  }
  @Delete('/:id')
  @HttpCode(204)
  deleteCar(@Param('id') id: string) {
    return this.carsService.deleteCar(id);
  }
}
