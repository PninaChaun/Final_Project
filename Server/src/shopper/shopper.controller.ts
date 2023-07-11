import { Body, Controller, Post,Get, Request,  Res,  UseGuards, Param, Put } from '@nestjs/common';
import { ShopperService } from './shopper.service';
import { AutenticationService } from 'src/autentication/autentication.service';
import { ShopperDTO } from 'src/DTO/shopper';
import { Response } from 'express';

@Controller('shopper')
export class ShopperController {

    constructor(private srv: ShopperService) { }

    @UseGuards(AutenticationService)
    @Post()
    async goToStore(@Request() req,@Body()shopper:ShopperDTO, @Res() res: Response) {
        shopper.userId = req['user'].id;

        let shopId = await this.srv.insertShopper(shopper)
        
        res.send(JSON.stringify(shopId))
    }

    @UseGuards(AutenticationService)
    @Get(':date')
    async getShopper(@Request() req,@Param('date') dateTime : string,@Res() res:Response)
    {
        let id = req['user'].id; 
        let date = new Date(dateTime)
        let response = await this.srv.findPotentialCustomer(id ,date);
        res.send(response);

    }

    @UseGuards(AutenticationService)
    @Post(':orderId')
    async saveBuy(@Request() req,@Param('orderId') oId: string ,@Body()body:any ,@Res() res:Response)
    {
        let orderId = Number.parseInt(oId)
        
        let status =await this.srv.saveBuy(Number.parseInt(body.shopId), orderId)
        res.status(status).send()
    }
}