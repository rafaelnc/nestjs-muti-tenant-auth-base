import { Test, TestingModule } from '@nestjs/testing';
import { TentantService } from './tenant.service';

describe('TentantService', () => {
  let service: TentantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TentantService],
    }).compile();

    service = module.get<TentantService>(TentantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
