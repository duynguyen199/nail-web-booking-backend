import { Test, TestingModule } from '@nestjs/testing';
import { NailTechProfileController } from './nail-tech-profile.controller';

describe('NailTechProfileController', () => {
  let controller: NailTechProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NailTechProfileController],
    }).compile();

    controller = module.get<NailTechProfileController>(NailTechProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
