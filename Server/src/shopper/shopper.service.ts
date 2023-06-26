import { Injectable } from '@nestjs/common';
import { ShopperDTO } from 'src/DTO/shopper';
import { DataBaseConnectionService } from 'src/data-base-connection/data-base-connection.service';

@Injectable()
export class ShopperService {

    constructor(private srv:DataBaseConnectionService){}

    insertShopper(shopper:ShopperDTO) {
        shopper.active=true;
        shopper.datetime=new Date();
        
        // return new Promise((resolve,reject)=>{
            const status =this.srv.insertShopper(shopper);
            return status;
            // resolve(status);
        // })
        
        
    }

    findPotentialCustomer(id:Number, prevTime:Date){
        return this.srv.getAllOrders(prevTime)
    }

}
