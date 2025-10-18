import { Test, TestingModule } from '@nestjs/testing';
import { AutoCancelProcessor } from './auto-cancel.processor';

describe('AutoCancelProcessor', () => {
  let provider: AutoCancelProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoCancelProcessor],
    }).compile();

    provider = module.get<AutoCancelProcessor>(AutoCancelProcessor);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
