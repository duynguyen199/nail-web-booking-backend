import { Test, TestingModule } from '@nestjs/testing';
import { AutoCancel } from './auto-cancel.processor';

describe('AutoCancel', () => {
  let provider: AutoCancel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoCancel],
    }).compile();

    provider = module.get<AutoCancel>(AutoCancel);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
