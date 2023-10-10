import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { DataBaseConnectionService } from './data-base-connection/data-base-connection.service';
import { JwtService } from '@nestjs/jwt';
import { LoginModule } from './login/login.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { AutenticationService } from './autentication/autentication.service';
import { ShopperService } from './shopper/shopper.service';
import { ShopperController } from './shopper/shopper.controller';
import { AdminAuthorizationService } from './admin-authorization/admin-authorization.service';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { GroupsController } from './groups/groups.controller';
import { GroupsService } from './groups/groups.service';
import { EmailService } from './email/email.service';
import { InvitesController } from './invites/invites.controller';
import { InvitesService } from './invites/invites.service';

@Module({
  imports: [
    LoginModule,
    MailerModule.forRoot({
      transport: 'smtps://p0583202191@gmail.com:ghpjvsxlpffcbaar@smtp.gmail.com',
      defaults: {
        from: '"shop4you" <p0583202191@gmail.com>',
      },
      preview: true,
    }),],
  controllers: [AppController, LoginController, OrdersController, ShopperController, AdminController, GroupsController, InvitesController],
  providers: [AppService, LoginService, DataBaseConnectionService, JwtService, OrdersService, AutenticationService, ShopperService, AdminAuthorizationService, AdminService, GroupsService, EmailService, InvitesService],
})
export class AppModule {}
