import { Test, TestingModule } from '@nestjs/testing';
import { SmsSenderController } from './sms-sender.controller';

describe('SmsSenderController', () => {
  let controller: SmsSenderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsSenderController],
    }).compile();

    controller = module.get<SmsSenderController>(SmsSenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
