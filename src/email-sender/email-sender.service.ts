import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSenderService {
  sendEmail(email: string, content: string) {
    // implements logic
  }
}
