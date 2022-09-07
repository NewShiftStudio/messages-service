export class SendSmsResponseDto {
  readonly sms: {
    [key in string]: {
      // string is phone number
      status: 'ERROR';
      status_text: string;
    };
  };
}
