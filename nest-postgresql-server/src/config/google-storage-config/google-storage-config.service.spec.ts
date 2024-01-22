import { Test, TestingModule } from '@nestjs/testing';
import { GoogleStorageConfigService } from './google-storage-config.service';

describe('GoogleStorageConfigService', () => {
  let service: GoogleStorageConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleStorageConfigService],
    }).compile();

    service = module.get<GoogleStorageConfigService>(GoogleStorageConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
