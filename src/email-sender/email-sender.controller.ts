import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { SendEmailDto } from './dto/send-email.dto';
import { EmailSenderService } from './email-sender.service';

@Controller('email-sender')
export class EmailSenderController {
  constructor(private emailService: EmailSenderService) {}

  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @Post('send-email')
  sendSms(@Body() dto: SendEmailDto) {
    return this.emailService.sendEmail(dto.email, dto.content);
  }
}
