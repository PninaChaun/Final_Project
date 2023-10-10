import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    public sendEmail(to, subject, text): void {
        this.mailerService
          .sendMail({
            to: to, // list of receivers
            from: '"shop4you" <p0583202191@gmail.com>', // sender address
            subject: subject, // Subject line
            // text: text, // plaintext body
            html: '<img className="logo" src="src/assets/img/logo.png" width="150px" />\
            <b>'+text+'</b> \
            <button>להצטרפות לקבוצה</botton>'
          })
          .then(() => {console.log('sent email');
          })
          .catch((e) => {console.log(e,'did not send email');
          });
      }
}
