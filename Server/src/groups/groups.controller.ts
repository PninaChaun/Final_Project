import { Body, Controller, Post, Request, Res, Param, Get, UseGuards, Put } from '@nestjs/common';
import { orderDTO } from 'src/DTO/order.dto';
import { Response } from 'express';
import { AutenticationService } from 'src/autentication/autentication.service';
import { get } from 'http';
import { GroupsService } from './groups.service';
import { log } from 'handlebars/runtime';
import { inviteDTO } from 'src/DTO/invite.dto';
import { groupDTO } from 'src/DTO/group.dto';
// TODO_AFTER remove all unnecessary imports

@Controller('groups')
export class GroupsController {

    constructor(private srv: GroupsService) { }

    @UseGuards(AutenticationService)
    @Get()
    async getMyGroups(@Request() req, @Res() res: Response) {
        let userId = req['user'].id;
        try {
            let groups = await this.srv.getMyGroups(userId)
            res.send(groups)
        }
        catch {
            res.status(404).send([])
        }

    }

    @UseGuards(AutenticationService)
    @Get(':group_id')
    async getMembers(@Request() req, @Param('group_id') group_id: string, @Res() res: Response) {
        let members = await this.srv.getMembers(parseInt(group_id))
        let invites = await this.srv.getInvites(parseInt(group_id))
        res.send({ "members": members, "invites": invites })
    }

    @UseGuards(AutenticationService)
    @Post(':group_id')
    async insertinvite(@Request() req, @Param('group_id') group_id: string, @Body() invite: inviteDTO, @Res() res: Response) {

        invite.inviterId = req['user'].id;
        let groupId =parseInt(group_id)

        let is_member = await this.srv.isMember(groupId, invite.email)
        let response = ''

        if (!is_member) {
            let is_invite = await this.srv.isInvite(groupId, invite.email)
            if (!is_invite) {
                let response = await this.srv.insertinvite(invite, groupId)
                // TODO send email to invite

                res.status(response).send()
                return
            }
            else{
                response = 'invite'

            }
        }
        else{

            response= 'member'
        }
        console.log(response,'resp');
        

        res.status(400).send(response)
    }
    @UseGuards(AutenticationService)
    @Post()
    async insertGroup(@Request() req, @Body() group: groupDTO, @Res() res: Response){
        let userId = req['user'].id;
        
        await this.srv.CreateGroup(group, userId)
        // .then(()=>
            res.status(201).send()
        // )
    }
}