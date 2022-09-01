import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmsSenderModule } from './sms-sender/sms-sender.module';
import { EmailSenderModule } from './email-sender/email-sender.module';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { MailerModule } from '@nestjs-modules/mailer';

config();

if (!process.env.PORT) throw new Error('Added PORT to .env file !!');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
