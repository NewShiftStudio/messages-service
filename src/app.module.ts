import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { config } from 'dotenv';

import { SmsSenderModule } from './features/sms-sender/sms-sender.module';
import { EmailSenderModule } from './features/email-sender/email-sender.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SentryInterceptor } from './common/interceptors/sentry.interceptor';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        secure: true,
        port: +process.env.EMAIL_SERVICE_PORT,
        host: process.env.EMAIL_SERVICE_HOST,
        auth: {
          user: process.env.EMAIL_AUTH_USER,
          pass: process.env.EMAIL_AUTH_PASSWORD,
        },
      },
    }),
    SmsSenderModule,
    EmailSenderModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor,
    },
  ],
})
export class AppModule {}
