import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.getAllCars();
  }

  @Get(':id')
  getCarById(@Param('id') carId: string) {
    return this.carsService.getCarById(carId);
  }

  @Post()
  @HttpCode(201)
  createCar(@Body() carBody: CreateCarDto) {
    return this.carsService.createCar(carBody);
  }

  @Patch(':id')
  updateCar(@Param('id') carId: string, @Body() updateCarBody: UpdateCarDto) {
    return this.carsService.updateCar(carId, updateCarBody);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteCar(@Param('id') carId: string) {
    return this.carsService.deleteCar(carId);
  }
}
