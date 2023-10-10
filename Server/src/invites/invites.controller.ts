import { AutenticationService } from 'src/autentication/autentication.service';
import { Body, Controller, Post, Request, Res, Param, Get,Delete, UseGuards, Put } from '@nestjs/common';
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
            res.status(404).send()
        }

    }

    @UseGuards(AutenticationService)
    @Post(':inviteId')
    async insertinvite(@Request() req, @Param('inviteId') inviteId: string, @Res() res: Response) {
        let userId =req['user'].id;
        let status = await this.srv.insertInvite(parseInt(inviteId), userId)
        res.status(status).send()
    }

    @UseGuards(AutenticationService)
    @Delete(':inviteId')
    async leaveInvite(@Request() req, @Param('inviteId') inviteId: string, @Res() res: Response) {
        let status = await this.srv.leaveInvite(parseInt(inviteId))
        res.status(status).send()
    }
}
