import { Injectable } from '@nestjs/common';
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
}
