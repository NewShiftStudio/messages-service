import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailSenderService {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail({ email, content, subject, date }: SendEmailDto) {
    try {
      const response = await this.mailService.sendMail({
        to: email,
        from: process.env.EMAIL_AUTH_USER,
        subject,
        date,
        text: '',
        html: content,
      });

      return response;
    } catch (error) {
      console.error('sendEmail error', error);
    }
  }
}
