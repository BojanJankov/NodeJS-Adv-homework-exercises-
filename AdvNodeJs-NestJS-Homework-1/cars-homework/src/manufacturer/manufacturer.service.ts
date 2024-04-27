import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './entitites/manufacturer.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateManufacturerDto } from './dtos/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dtos/update-manufacturer.dto';
import { ManufacturerFilters } from './interfaces/manufacturer-filters';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturerRepo: Repository<Manufacturer>,
  ) {}

  async getAllManufacturers(filters: ManufacturerFilters) {
    const filtersConfig: FindManyOptions<Manufacturer> = {};

    filtersConfig.take = filters.maxResults;
    filtersConfig.skip = filters.firstResult;

    if (filters.name) {
      filtersConfig.where = { name: filters.name };
    }

    if (filters.headquarters) {
      filtersConfig.where = {
        ...filtersConfig.where,
        headquarters: filters.headquarters,
      };
    }
    const manufacturers = await this.manufacturerRepo.find(filtersConfig);
    const count = await this.manufacturerRepo.count();

    return {
      manufacturers,
      totalRecords: count,
    };
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
