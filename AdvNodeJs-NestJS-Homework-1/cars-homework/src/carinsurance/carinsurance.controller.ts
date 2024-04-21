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
import { CarinsuranceService } from './carinsurance.service';
import { CreateCarInsurenceDto } from './dtos/create-carinsurence.dto';
import { UpdateCarInsurenceDto } from './dtos/update-carinsurence.dto';
import { AuthGuard } from 'src/auth/auth.quard';

@UseGuards(AuthGuard)
@Controller('carinsurance')
export class CarinsuranceController {
  constructor(private carInsuranceService: CarinsuranceService) {}

  @Get()
  getAllCarInsurance() {
    return this.carInsuranceService.getAllCarInsurances();
  }

  @Get('/:id')
  getCarInsurenceById(@Param('id') id: string) {
    return this.carInsuranceService.getCarInsurenceById(id);
  }

  @Post()
  createCarInsurence(@Body() manufacturerData: CreateCarInsurenceDto) {
    return this.carInsuranceService.createCarInsurence(manufacturerData);
  }

  @Patch('/:id')
  updateCarInsurence(
    @Param('id') id: string,
    @Body() updateData: UpdateCarInsurenceDto,
  ) {
    return this.carInsuranceService.updateCarInsurence(id, updateData);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteCarInsurence(@Param('id') id: string) {
    return this.carInsuranceService.deleteCarInsurence(id);
  }
}
