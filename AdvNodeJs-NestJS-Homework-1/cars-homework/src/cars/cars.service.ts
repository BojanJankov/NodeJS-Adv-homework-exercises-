import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interface/car.interface';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { CreateCarDto } from './dtos/create-car.dto';
import { v4 as uuid } from 'uuid';
import { UpdateCarDto } from './dtos/update-car.dto';

@Injectable()
export class CarsService {
  async getAllCars() {
    const carsJSON = await readFile(
      join(process.cwd(), 'src', 'cars', 'data', 'cars.json'),
      'utf-8',
    );

    const cars: Car[] = JSON.parse(carsJSON);

    return cars;
  }

  async saveCars(cars: Car[]) {
    await writeFile(
      join(process.cwd(), 'src', 'cars', 'data', 'cars.json'),
      JSON.stringify(cars, null, 2),
      'utf-8',
    );
  }
  async getCarById(carId: string) {
    const cars = await this.getAllCars();

    const foundCar = cars.find((car) => car.id === carId);

    if (!foundCar) throw new NotFoundException('Car Not Found');

    return foundCar;
  }
  async createCar(carData: CreateCarDto) {
    const cars = await this.getAllCars();

    const newCar: Car = { id: uuid(), ...carData };

    cars.push(newCar);

    await this.saveCars(cars);

    return newCar;
  }
  async updateCar(carId: string, updateCarData: UpdateCarDto) {
    const cars = await this.getAllCars();

    const foundCar = cars.some((car) => car.id === carId);

    if (!foundCar) throw new NotFoundException('Car Not Found');

    const updatedCars = cars.map((car) => {
      if (car.id === carId) {
        return { ...car, ...updateCarData };
      } else {
        return car;
      }
    });

    await this.saveCars(updatedCars);
  }

  async deleteCar(carId: string) {
    const cars = await this.getAllCars();

    const updatedCars = cars.filter((car) => car.id !== carId);

    if (cars.length === updatedCars.length)
      throw new NotFoundException('Car Not Found');

    await this.saveCars(updatedCars);
  }
}
