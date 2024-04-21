import { Test, TestingModule } from '@nestjs/testing';
import { CarinsuranceService } from './carinsurance.service';

describe('CarinsuranceService', () => {
  let service: CarinsuranceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarinsuranceService],
    }).compile();

    service = module.get<CarinsuranceService>(CarinsuranceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
