import { Controller, Get, Res,Request, UseGuards } from '@nestjs/common';
import { AdminAuthorizationService } from 'src/admin-authorization/admin-authorization.service';
import { AutenticationService } from 'src/autentication/autentication.service';
import { AdminService } from './admin.service';
import { Response } from 'express';


@Controller('admin')
export class AdminController {

    constructor(private srv: AdminService){}

    @UseGuards(AdminAuthorizationService)
    @Get()
    async getUsers (@Request() req,@Res() res: Response){

        res.send(await this.srv.getUsers())
    }


}

