import { Injectable } from '@nestjs/common';
import { DataBaseConnectionService } from 'src/data-base-connection/data-base-connection.service';

@Injectable()
export class AdminService {

    constructor(private srv:DataBaseConnectionService){}

    getUsers =async ()=>{
        return await this.srv.getUsers()
    }
}
