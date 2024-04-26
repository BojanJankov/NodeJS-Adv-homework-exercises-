import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dtos/create-feature.dto';

@Controller('feature')
export class FeatureController {
  constructor(private featureService: FeatureService) {}

  @Get()
  getAllFeatures() {
    return this.featureService.getAllFeatures();
  }

  @Get('/:id')
  getFeatureById(@Param('id') id: string) {
    return this.featureService.getFeatureById(id);
  }

  @Post()
  createFeature(@Body() featureData: CreateFeatureDto) {
    return this.featureService.createFeature(featureData);
  }
}
