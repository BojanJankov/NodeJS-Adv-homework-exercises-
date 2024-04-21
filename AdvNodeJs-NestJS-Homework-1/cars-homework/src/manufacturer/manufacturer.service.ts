import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './entitites/manufacturer.entity';
import { Repository } from 'typeorm';
import { CreateManufacturerDto } from './dtos/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dtos/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturerRepo: Repository<Manufacturer>,
  ) {}

  getAllManufacturers() {
    return this.manufacturerRepo.find({ loadRelationIds: true });
  }

  getManufacturerById(id: string) {
    const foundManufacturer = this.manufacturerRepo.findOne({
      where: { id },
      relations: {
        cars: true,
      },
    });

    if (!foundManufacturer)
      throw new NotFoundException('Manufacturer Not Found');

    return foundManufacturer;
  }

  createManufacturer(manufacturerData: CreateManufacturerDto) {
    const newManufacturer = this.manufacturerRepo.create({
      name: manufacturerData.name,
      headquarters: manufacturerData.headquarters,
    });

    return this.manufacturerRepo.save(newManufacturer);
  }

  async updateManufacturer(
    id: string,
    updateManufacturerData: UpdateManufacturerDto,
  ) {
    const foundManufacturer = await this.getManufacturerById(id);

    Object.assign(foundManufacturer, updateManufacturerData);

    await this.manufacturerRepo.save(foundManufacturer);
  }

  async deleteManufacturer(id: string) {
    const foundManufacturer = await this.getManufacturerById(id);

    await this.manufacturerRepo.remove(foundManufacturer);
  }
}
