import { Injectable } from '@nestjs/common';
import { inviteDTO } from 'src/DTO/invite.dto';
import { DataBaseConnectionService } from 'src/data-base-connection/data-base-connection.service';

@Injectable()
export class InvitesService {
    constructor(private srv: DataBaseConnectionService) { }

    getMyInvites = async (userId) => {
        let invites:inviteDTO[] = await this.srv.getMyInvites(userId)
        
        let invitesDetails = []
        for(let i =0; i<invites.length; i++){
            let currentInvite = invites[i]
            let inviterName =await this.srv.getUserName(currentInvite.inviterId)
            let name = await this.srv.getUserName(userId)
            let groupName = await this.srv.getGroupName(currentInvite.groupId)

            invitesDetails.push({id:currentInvite.id, name: name, email:currentInvite.email , inviterName:inviterName,groupName:groupName })
        }
        return invitesDetails
    }
}
