import { Body, Controller, Post,Get, Request,  Res,  UseGuards, Param } from '@nestjs/common';
import { ShopperService } from './shopper.service';
import { AutenticationService } from 'src/autentication/autentication.service';
import { ShopperDTO } from 'src/DTO/shopper';
import { Response } from 'express';
import { get } from 'https';

@Controller('shopper')
export class ShopperController {

    constructor(private srv: ShopperService) { }

    @UseGuards(AutenticationService)
    @Post()
    login_user(@Request() req,@Body()shopper:ShopperDTO, @Res() res: Response) {
        shopper.userId = req['user'].id;

        let status=this.srv.insertShopper(shopper)
        res.status(status).send()
    }

    @UseGuards(AutenticationService)
    @Get()
    async getPotentialCustomer(@Request() req,@Body()prevTime:Date,@Res() res:Response){
        let id = req['user'].id;        
     let response = await this.srv.findPotentialCustomer(id , prevTime)
        
        // console.log(prevTime,'prevTime');
        res.send(response);
    }

    @UseGuards(AutenticationService)
    @Get(':date')
    async getOrder(@Request() req,@Param('date') dateTime : string,@Res() res:Response)
    {
        let id = req['user'].id; 
        let date = new Date(dateTime)
        let response = await this.srv.findPotentialCustomer(id ,date);
        res.send(response);

    }

    @UseGuards(AutenticationService)
    @Post(':orderId')
    async saveBuy(@Request() req,@Param('orderId') oId: string ,@Res() res:Response)
    {
        let id = req['user'].id;
        let orderId = Number.parseInt(oId)
        
        let status =await this.srv.saveBuy(id, orderId)
        res.status(status).send()
    }
}