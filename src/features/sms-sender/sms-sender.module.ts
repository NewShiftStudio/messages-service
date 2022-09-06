import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SmsSenderService } from './sms-sender.service';
import { SmsSenderController } from './sms-sender.controller';

@Module({
  imports: [HttpModule],
  providers: [SmsSenderService],
  controllers: [SmsSenderController],
})
export class SmsSenderModule {}
