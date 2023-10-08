import { Injectable } from '@nestjs/common';
import { orderDTO } from 'src/DTO/order.dto';
import { ShopperDTO } from 'src/DTO/shopper';
import { DataBaseConnectionService } from 'src/data-base-connection/data-base-connection.service';

@Injectable()
export class ShopperService {

    constructor(private srv: DataBaseConnectionService) { }

    insertShopper(shopper: ShopperDTO) {
        shopper.active = true;
        shopper.datetime = new Date();

        // return new Promise((resolve,reject)=>{
        const status = this.srv.insertShopper(shopper);
        return status;
        // resolve(status);
        // })


    }

    async findPotentialCustomer(userId: Number, prevTime: Date) {
        let myGroups = await this.srv.getMyGroups(userId)
        let ordersUsers = []
        return this.srv.getAllOrders(myGroups, prevTime).then(
            async(o) => {                
                let orders: orderDTO[] = o['col']
                console.log(orders,'orders');
                
                for (let i = 0; i < orders.length; i++) {
                    let order = orders[i]
                    let user = await this.srv.getUser(order.userId)
                    
                    ordersUsers.push({ order, user })
                }

            }).then(r => {
                return { col: ordersUsers, newPrevDate: new Date() }
            })
    }

    saveBuy(shopId:number, orderId:number){
        
        const status =  this.srv.updateOrder_addShopperId(shopId, orderId)
        return status
    }
}
