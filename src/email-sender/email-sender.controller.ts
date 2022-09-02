import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { SendEmailDto } from './dto/send-email.dto';
import { EmailSenderService } from './email-sender.service';

@Controller('email-sender')
export class EmailSenderController {
  constructor(private emailService: EmailSenderService) {}

  @MessagePattern('send-email')
  sendEmail(@Payload() dto: SendEmailDto) {
    return this.emailService.sendEmail(dto);
  }
}
