import { Module } from '@nestjs/common';
import { SmsSenderService } from './sms-sender.service';
import { SmsSenderController } from './sms-sender.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, JwtModule],
  providers: [SmsSenderService],
  controllers: [SmsSenderController],
})
export class SmsSenderModule {}
