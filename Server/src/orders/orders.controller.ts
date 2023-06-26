import { Body, Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { orderDTO } from 'src/DTO/order.dto';
import { Response } from 'express';
import { AutenticationService } from 'src/autentication/autentication.service';


@Controller('orders')
export class OrdersController {

    constructor(private srv: OrdersService) { }

    @UseGuards(AutenticationService)
    @Post()
    async login_user(@Request() req,@Body() order: orderDTO, @Res() res: Response) {  
        order.userId = req['user'].id;
        let response = this.srv.insertOrder(order)
        res.status(await response.stat).send()
    }

}
