import { Test, TestingModule } from '@nestjs/testing';
import { NailTechProfileService } from './nail-tech-profile.service';

describe('NailTechProfileService', () => {
  let service: NailTechProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NailTechProfileService],
    }).compile();

    service = module.get<NailTechProfileService>(NailTechProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
