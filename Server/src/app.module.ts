import { Module } from '@nestjs/common';
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

@Module({
  imports: [LoginModule],
  controllers: [AppController, LoginController, OrdersController, ShopperController],
  providers: [AppService, LoginService, DataBaseConnectionService, JwtService, OrdersService, AutenticationService, ShopperService],
})
export class AppModule {}
