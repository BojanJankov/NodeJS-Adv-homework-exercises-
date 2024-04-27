import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { Repository } from 'typeorm';
import { CreateFeatureDto } from './dtos/create-feature.dto';
import { UpdateFeatureDto } from './dtos/update-feature.dto';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature) private featuresRepo: Repository<Feature>,
  ) {}

  getAllFeatures() {
    return this.featuresRepo.find({ loadRelationIds: true });
  }

  async getFeatureById(id: string) {
    const foundFeature = await this.featuresRepo.findOneBy({ id });

    if (!foundFeature) throw new NotFoundException('Feature Not Found');

    return foundFeature;
  }

  createFeature(featureData: CreateFeatureDto) {
    return this.featuresRepo.save(featureData);
  }

  async updateFeature(id: string, featureData: UpdateFeatureDto) {
    const foundFeature = await this.getFeatureById(id);

    Object.assign(foundFeature, featureData);

    await this.featuresRepo.save(foundFeature);
  }

  async deleteFeature(id: string) {
    const foundFeature = await this.getFeatureById(id);

    await this.featuresRepo.remove(foundFeature);
  }
}
