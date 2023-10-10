import { AutenticationService } from 'src/autentication/autentication.service';
import { Body, Controller, Post, Request, Res, Param, Get, UseGuards, Put } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { Response } from 'express';

@Controller('invites')
export class InvitesController {

    constructor(private srv: InvitesService) { }

    @UseGuards(AutenticationService)
    @Get()
    async getMyGroups(@Request() req, @Res() res: Response) {
        let userId = req['user'].id;

        try {
            let groups = await this.srv.getMyInvites(userId)
            res.send(groups)
        }
        catch {
            res.status(404).send([])
        }

    }
}
