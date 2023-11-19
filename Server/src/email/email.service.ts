import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { createReadStream } from 'fs';
@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    public sendEmail(to, subject, text): void {
        this.mailerService
          .sendMail({

            to: to, // list of receivers
            from: '"shop4you" <shop.for.community@gmail.com>', // sender address

            subject: subject, // Subject line
            // text: text, // plaintext body
            html: '<img className="logo" src="cid:logo" width="150px" />\
            <b>'+text+'</b> \
            <a href="http://localhost:5173"><button>הצטרפות לקבוצה</button></a>',
            attachments: [{
              filename: 'logo.png',
              path:'src/assets/img/logo.png',
              cid: 'logo'
            }]
          })
          .then(() => {console.log('sent email');
          })
          .catch((e) => {console.log(e,'did not send email');
          });
      }
}
