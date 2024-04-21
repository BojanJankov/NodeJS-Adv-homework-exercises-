import { Test, TestingModule } from '@nestjs/testing';
import { CarinsuranceController } from './carinsurance.controller';

describe('CarinsuranceController', () => {
  let controller: CarinsuranceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarinsuranceController],
    }).compile();

    controller = module.get<CarinsuranceController>(CarinsuranceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
