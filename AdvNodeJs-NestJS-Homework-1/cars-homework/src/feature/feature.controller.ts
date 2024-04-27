import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dtos/create-feature.dto';
import { AuthGuard } from 'src/auth/auth.quard';
import { UpdateFeatureDto } from './dtos/update-feature.dto';

@UseGuards(AuthGuard)
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

  @Patch('/:id')
  updateFeature(
    @Param('id') id: string,
    @Body() updateFeatureData: UpdateFeatureDto,
  ) {
    return this.featureService.updateFeature(id, updateFeatureData);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteFeature(@Param('id') id: string) {
    return this.featureService.deleteFeature(id);
  }
}
