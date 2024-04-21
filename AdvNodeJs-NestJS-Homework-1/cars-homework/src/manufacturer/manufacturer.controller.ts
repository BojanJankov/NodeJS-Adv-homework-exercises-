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
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dtos/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dtos/update-manufacturer.dto';
import { AuthGuard } from 'src/auth/auth.quard';

@UseGuards(AuthGuard)
@Controller('manufacturer')
export class ManufacturerController {
  constructor(private manufacturerService: ManufacturerService) {}

  @Get()
  getAllManufacturers() {
    return this.manufacturerService.getAllManufacturers();
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
