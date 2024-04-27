import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dtos/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dtos/update-manufacturer.dto';
import { AuthGuard } from 'src/auth/auth.quard';
import { ManufacturerFilters } from './interfaces/manufacturer-filters';

@UseGuards(AuthGuard)
@Controller('manufacturer')
export class ManufacturerController {
  constructor(private manufacturerService: ManufacturerService) {}

  @Get()
  getAllManufacturers(
    @Query('name') name: string,
    @Query('headquarters') headquarters: string,
    @Query('maxResults') maxResults: string,
    @Query('firstResult') firstResult: string,
  ) {
    const filters: ManufacturerFilters = {
      name,
      headquarters,
    };

    filters.maxResults = maxResults ? Number(maxResults) : 10;
    filters.firstResult = firstResult ? Number(firstResult) - 1 : 0;

    return this.manufacturerService.getAllManufacturers(filters);
  }

  @Get('/:id')
  getManufacturerById(@Param('id') id: string) {
    return this.manufacturerService.getManufacturerById(id);
  }

  @Post()
  createManufacturer(@Body() manufacturerData: CreateManufacturerDto) {
    return this.manufacturerService.createManufacturer(manufacturerData);
  }

  @Patch('/:id')
  updateManufacturer(
    @Param('id') id: string,
    @Body() updateData: UpdateManufacturerDto,
  ) {
    return this.manufacturerService.updateManufacturer(id, updateData);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteManufacturer(@Param('id') id: string) {
    return this.manufacturerService.deleteManufacturer(id);
  }
}
