import { Body, Controller, Post, Request, Res, Param, Get,UseGuards, Put } from '@nestjs/common';
import { orderDTO } from 'src/DTO/order.dto';
import { Response } from 'express';
import { AutenticationService } from 'src/autentication/autentication.service';
import { get } from 'http';
import { GroupsService } from './groups.service';
import { log } from 'handlebars/runtime';
// TODO_AFTER remove all unnecessary imports

@Controller('groups')
export class GroupsController {

    constructor(private srv: GroupsService){}

    @UseGuards(AutenticationService)
    @Get()
    async getMyGroups(@Request() req, @Res() res:Response)
    {
        let userId = req['user'].id;
        try{
            console.log(userId);
            
            let groups = await this.srv.getMyGroups(userId)
            console.log(groups);
            
            res.send(groups)
        }
        catch{
            res.status(404).send([])
        }

    }

    @UseGuards(AutenticationService)
    @Get(':group_id')
    async getUsers (@Request() req, @Param('group_id') group_id : string, @Res() res: Response){
        res.send(await this.srv.getMembers(parseInt(group_id)))
    }

}
