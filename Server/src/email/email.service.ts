import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    public sendEmail(to, subject, text): void {
        this.mailerService
          .sendMail({
            to: to, // list of receivers
            from: 'noreply@nestjs.com', // sender address
            subject: subject, // Subject line
            text: text, // plaintext body
            html: '<b>welcome</b>', // HTML body content
          })
          .then(() => {console.log('sent email');
          })
          .catch(() => {console.log('did not send email');
          });
      }
}
