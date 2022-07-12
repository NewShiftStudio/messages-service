import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendSmsDto } from './dto/send-sms.dto';
import { SmsSenderService } from './sms-sender.service';

@Controller('sms-sender')
export class SmsSenderController {
  constructor(private smsService: SmsSenderService) {}

  @MessagePattern('send-sms')
  sendSms(@Payload() dto: SendSmsDto) {
    return this.smsService.sendSms(dto.phone, dto.msg);
  }
}
