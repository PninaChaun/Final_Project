import { Injectable } from '@nestjs/common';
import { orderDTO } from 'src/DTO/order.dto';
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
        let ordersUsers =[]
        return  this.srv.getAllOrders(prevTime).then(
            async o=>{
                let orders:orderDTO[] = o['col']
        for (let i =0; i< orders.length; i++){
            let order = orders[i]
            let user =await this.srv.getUser(order.userId)
            user = user[0]
            ordersUsers.push({order, user})
        }

    }).then(r=>{ console.log(ordersUsers);
        return {col:ordersUsers, newPrevDate: new Date()}})
}
}
