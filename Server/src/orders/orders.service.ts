import { Injectable, UseGuards } from '@nestjs/common';
import { request } from 'http';
import { orderDTO } from 'src/DTO/order.dto';
import { DataBaseConnectionService } from 'src/data-base-connection/data-base-connection.service';

@Injectable()
export class OrdersService {
    constructor(private srv:DataBaseConnectionService){}

    
    insertOrder(order:orderDTO){
        order.shopperId=null;
        order.active=true;
        order.beginDate = new Date()
        let response = this.srv.insertOrder(order);
        return response;
    }

    async hasShopperId(orderId : Number){
        let col =await this.srv.getOrder_hasShopperId(orderId);
        console.log(col);
        col = col[0]
        if (col.shopperId){          
          let shopper = await this.srv.getUser(col.shopperId)
          shopper = shopper[0]
          return {stat:200, shopper: shopper};
        }
        return {stat:404, shopper: null};
    }
}
