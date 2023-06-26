import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {;

  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'p0583202194@gmail.com',
      pass: 'your213879133password'
    }
  });
  
  var mailOptions = {
    from: 'p0583202191@gmail.com',
    to: 'ortal8932@gmail.com',
    subject: 'ברוכה הבאה לאפלקציה',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  ///TODOלמחוק את DATA
  await app.listen(3000);
}
bootstrap();
