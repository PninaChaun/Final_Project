import { Injectable } from '@nestjs/common';
import { groupDTO } from 'src/DTO/group.dto';
import { inviteDTO } from 'src/DTO/invite.dto';
import { DataBaseConnectionService } from 'src/data-base-connection/data-base-connection.service';

@Injectable()
export class GroupsService {

    constructor(private srv:DataBaseConnectionService){}

    async getMyGroups(userId){
        let groups = await this.srv.getMyGroups(userId)
        return groups
    }

    getMembers =async (group_id)=>{
        return await this.srv.getMembers(group_id)
    }

    getInvites =async (group_id)=>{
        return await this.srv.getInvites(group_id)
    }

    async isMember(group_id,email){
        let members =await this.srv.getMembers(group_id)
        if(members)
        {
            for(let i =0; i< members.length; i++){
            let member =members[i]
            // let member = await this.srv.getUser(member_id)
            if(member.email == email){
                return true
            }
        }
        
        }
        return false
    }

    async isInvite(group_id,email){
        let invites =await this.srv.getInvites(group_id)
        console.log(invites,'inv');
        
        if(invites){
            for(let i =0; i< invites.length; i++){
                let invite =invites[i]
                // let member = await this.srv.getUser(member_id)
                if(invite.email == email){
                    return true
                }
            }
        }
       
        return false
    }

    async insertinvite(invite:inviteDTO, group_id:number){
        let invite_id = await this.srv.insertinvite(invite);
        let response = this.srv.addToGroupInvite(group_id, invite_id)
        return response;
    }

    async CreateGroup(group:groupDTO, member_id){
        let group_Id = await this.srv.CreateGroup(group, member_id)
        return await this.srv.addMember(group_Id, member_id)
        
    }
}
