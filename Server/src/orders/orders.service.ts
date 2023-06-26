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
        let s = this.srv.insertOrder(order);
        return {stat:s};
    }
}
