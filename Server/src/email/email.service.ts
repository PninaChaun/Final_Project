import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    public sendEmail(to, subject, text): void {
        this.mailerService
          .sendMail({
            to: to,
            from: '"shop4you" <shop.for.community@gmail.com>', 
            subject: subject,
            // text: text, // plaintext body
          
            html: '<img className="logo"src="src/img/logo.png" width="150px" />\
            <b>'+text+'</b> \
            <a href="http://localhost:5173"><button style="background-color: #FF8F45; color: white; padding: 8px 16px; border: #FF8F45; border-radius: 5px; font-size:small "> לכניסה לאתר</button></a>   '
         
          })
          .then(() => {console.log('sent email');
          })
          .catch((e) => {console.log(e,'did not send email');
          });
      }
}