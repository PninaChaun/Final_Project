import { Injectable } from '@nestjs/common';
import { orderDTO } from 'src/DTO/order.dto';
import { ShopperDTO } from 'src/DTO/shopper';
import { UserDTO } from 'src/DTO/user.dto';
const { MongoClient } = require('mongodb');
import * as bcrypt from 'bcrypt';
import { log } from 'console';

const client = new MongoClient('mongodb://127.0.0.1:27017');
let userId = 1;
let orderId = 1;
client.connect(err => {
    if (err) {
        console.error('Failed to connect to MongoDB!', err);
        return;
    }
}
)
const db = client.db('project');

@Injectable()
export class DataBaseConnectionService {
    // constructor(){
    //     db.createView( "sales", "orders", [
    //         {
    //            $lookup:
    //               {
    //                  from: "users",
    //                  localField: "userId",
    //                  foreignField: "userId",
    //                  as: "inventoryDocs"
    //               }
    //         },
    //         {
    //            $project:
    //               {
    //                 userId: 1,
    //                 orderId: 1,
    //                 saveOrder:"$inventoryDocs.saveOrder"
    //               }
    //         },
    //         //    { $unwind: "$price" }
    //      ] )
    // }

    getUsers = () => {
        let col = db.collection('users').find({}).toArray();
        return col;
    }

    getUser = (id: Number) => {
        let col = db.collection('users').find({ id: id }).toArray();
        //HELP כל מקום צריך להוסיף ]0 לדוגמא לוגין
        return col;
    }

    updateUser = (user: UserDTO) => {
        let u = this.getUser(user.id)[0]
        
        db.collection('users').deleteOne({ id: user.id })
        db.collection('users').insertOne({...u, ...user});
        return 200;
    };

    insertUser = async (user: UserDTO) => {

        let newId = await this.getNextSequenceValue('users')
        console.log(newId);
        db.collection('users').insertMany([{ ...user, id: newId }])
        return newId
    }

    getOrders = (userId) => {
        let col = db.collection('orders').find({ userId: userId }).toArray();
        return col;
    }

    getOrder= (orderId)=>{
        let col = db.collection('orders').find({ orderId: orderId }).toArray();
        return col;
    }

    getAllOrders = async (prevTime:Date) => {
        let col = await db.collection('orders').find({ active:true, beginDate :{$gt: prevTime }}).toArray();
        console.log(col[0],"col");
        
        return  {
            col:await col , newPrevDate:new Date()
        } 
    }

    insertOrder = async (order: orderDTO) => {
        try {
            let newId = await this.getNextSequenceValue('orders')

            order.orderId = newId
            
            let u =await this.getUser(order.userId)
            u = u[0]
            let ms = u.saveOrder * 60 * 60 * 1000
            // u.saveOrder = (Number) (u.saveOrder)
            // let untilDate = new Date(order.beginDate)
            // untilDate.setHours(untilDate.getHours()+u.saveOrder)

            db.collection('orders').insertMany([{ ...order }])

            setTimeout(() => {
                this.deactivateOrder(order.orderId)
            }, ms);

            return 201;

        }
        catch {
            return 500;
        }
    }

    deactivateOrder=(orderId:Number)=>{
        let o = this.getOrder(orderId)[0]
        
        db.collection('orders').deleteOne({ orderId: orderId })
        db.collection('orders').insertOne({...o, active:false});
        return 200;
    }

    insertShopper(shopper: ShopperDTO) {
        try {
            db.collection('shoppers').insertMany([{ userId: shopper.userId, store: shopper.store, datetime: shopper.datetime, active: shopper.active }])
            return 201;
        }
        catch {
            return 500;
        }
    }

    async getNextSequenceValue(sequenceName) {
        // Get a reference to the sequence collection
        const sequenceCollection = db.collection('sequence');

        // Find the sequence document and update its value
        const result = await sequenceCollection.findOneAndUpdate(
            { collection: sequenceName },
            { $inc: { nextId: 1 } },
            { upsert: true, returnOriginal: false }
        );

        // Return the updated sequence value
        return result.value.nextId;
    }

}

// db.createView( "sales", "orders", [
//     {
//        $lookup:
//           {
//              from: "users",
//              localField: "userId",
//              foreignField: "userId",
//              as: "inventoryDocs"
//           }
//     },
//     {
//        $project:
//           {
//             userId: 1,
//             orderId: 1,
//             saveOrder:"$inventoryDocs.saveOrder"
//           }
//     },
//     //    { $unwind: "$price" }
//  ] )