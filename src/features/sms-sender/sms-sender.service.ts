import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { config } from 'dotenv';

import { SendSmsResponseDto } from './dto/send-sms-response.dto';

config();

@Injectable()
export class SmsSenderService {
  SMS_BASE_URL = `https://sms.ru/sms/send?api_id=${process.env.SMS_SERVICE_API_KEY}`;

  constructor(private readonly httpService: HttpService) {}

  async sendSms(phone: string, msg: string) {
    const res = await firstValueFrom<SendSmsResponseDto>(
      this.httpService
        .get(this.SMS_BASE_URL, {
          params: {
            to: phone,
            msg,
            json: 1, // формат данных
          },
        })
        .pipe(map((res) => res.data))
        .pipe(catchError((_, caught) => caught)),
    );

    // такой объект возвращает sms.ru
    if (res?.sms[phone]?.status === 'ERROR') {
      throw new BadRequestException(
        res?.sms?.status_text || 'Произошла ошибка на стороне sms.ru',
      );
    }

    return res;
  }
}
