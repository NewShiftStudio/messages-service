import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailSenderService {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(email: string, content: string) {
    try {
      const response = await this.mailService.sendMail({
        to: email,
        from: process.env.EMAIL_AUTH_USER,
        text: '',
        html: content,
      });

      return response;
    } catch (error) {
      console.error('sendEmail error', error);
    }
  }
}
