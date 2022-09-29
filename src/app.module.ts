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

const requiredEnvs = [
  'PORT',
  'EMAIL_SERVICE',
  'EMAIL_AUTH_USER',
  'EMAIL_AUTH_PASSWORD',
  'SMS_SERVICE_API_KEY',
];

requiredEnvs.forEach((envKey) => {
  if (!process.env[envKey]) {
    throw new Error(`Added ${envKey} to .env file !!`);
  }
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        secure: process.env.NODE_ENV === 'production',
        port: 465,
        service: process.env.EMAIL_SERVICE,
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
