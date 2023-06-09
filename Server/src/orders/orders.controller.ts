import { Body, Controller, Post, Request, Res, Param, Get,UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { orderDTO } from 'src/DTO/order.dto';
import { Response } from 'express';
import { AutenticationService } from 'src/autentication/autentication.service';
import { get } from 'http';


@Controller('orders')
export class OrdersController {

    constructor(private srv: OrdersService) { }

    @UseGuards(AutenticationService)
    @Post()
    async create_order(@Request() req,@Body() order: orderDTO, @Res() res: Response) {  
        order.userId = req['user'].id;
        let response =await this.srv.insertOrder(order)
        res.status(response.stat).send({orderId:response.orderId})
    }

    @UseGuards(AutenticationService)
    @Get(':orderId')
    async getShopperForOrder(@Request() req,@Param('orderId') order_Id : string, @Res() res:Response)
    {
        let userId = req['user'].id;
        let orderId = Number.parseInt(order_Id)

        let response =await this.srv.hasShopperId(orderId)
        res.status(response.stat).send(response.shopper)

    }
}
