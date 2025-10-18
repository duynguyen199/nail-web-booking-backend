import { Test, TestingModule } from '@nestjs/testing';
import { Reminder } from './reminder.processors';

describe('Reminder', () => {
  let provider: Reminder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Reminder],
    }).compile();

    provider = module.get<Reminder>(Reminder);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
