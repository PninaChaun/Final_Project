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

    getShop = (id: Number) => {
        let col = db.collection('shoppers').find({ shopId: id }).toArray();
        return col;
    }

    updateUser = (user: UserDTO) => {
        let u = this.getUser(user.id)[0]

        db.collection('users').deleteOne({ id: user.id }).then(
            db.collection('users').insertOne({ ...u, ...user })
        )
        return 200;
    };

    insertUser = async (user: UserDTO) => {

        let newId = await this.getNextSequenceValue('users')

        user.saveOrder = user.saveOrder

        db.collection('users').insertMany([{ ...user, id: newId }])
        return newId
    }

    getOrders = (userId) => {
        let col = db.collection('orders').find({ userId: userId }).toArray();
        return col;
    }

    getOrder = (orderId) => {
        let col = db.collection('orders').find({ orderId: orderId }).toArray();
        return col;
    }

    getAllOrders = async (prevTime: Date) => {

        // let new_prevTime = Date.parse(prevTime)        

        let col = await db.collection('orders').find({ active: true, beginDate: { $gt: prevTime } }).toArray();//

        return {
            col: await col, newPrevDate: new Date()
        }
    }

    insertOrder = async (order: orderDTO) => {
        try {
            let newId = await this.getNextSequenceValue('orders')

            order.orderId = newId

            let u = await this.getUser(order.userId)
            u = u[0]
            let ms = u.saveOrder * 60 * 1000 //TODO add* 60 to get hours 

            db.collection('orders').insertMany([{ ...order }])

            setTimeout(() => {
                this.deactivateOrder(order.orderId)
            }, ms);

            return { stat: 201, orderId: newId };

        }
        catch {
            return { stat: 500, orderId: null };
        }
    }
    //TODO לשמור את השעה של saveOrder saveStore int not string
    deactivateOrder = async (orderId: Number) => {
        let o = await this.getOrder(orderId)

        o = o[0]
        db.collection('orders').deleteOne({ orderId: orderId }).then(
            db.collection('orders').insertOne({ ...o, active: false })
        )

        return 200;
    }

    deactivateShopper = async (shopId: Number) => {
        // let shop = await this.getShop(shopId)

        // shop = shop[0]
        // db.collection('shoppers').deleteOne({ shopId: shopId }).then(
        //     db.collection('shoppers').insertOne({ ...shop, active: false }) )
        db.collection('shoppers').updateOne({ shopId: shopId }, { $set: { active: false } })

        return 200;
    }

    updateOrder_addShopperId = async (shopId: number, orderId: Number) => {
        //TODO_AFTER change all await to then
        //TODO_AFTER why .toArray() and then [0]  in getUser, getOrder...
        //TODO_AFTER try to change updates to update and not to delete and insert
        console.log('orderId to get', orderId);

        let o = await this.getOrder(orderId)

        o = o[0]
        
        //TODO make sure this order is still available
        if (!o.active)
            return 404;     
            console.log(o , 'o');
            
            console.log('before update');
            db.collection('orders').updateOne({orderId: orderId}, {$set: { active: false, shopId: shopId}})

        // db.collection('orders').deleteOne({ orderId: orderId }).then(
        //     db.collection('orders').insertOne({ ...o, active: false, shopId: shopId })
        // )
        console.log('after update');

        return 200;
    }

    async insertShopper(shopper: ShopperDTO) {
        try {
            let newId = await this.getNextSequenceValue('shoppers')
            db.collection('shoppers').insertMany([{ ...shopper, shopId: newId }])

            let u = await this.getUser(shopper.userId)
            u = u[0]
            let ms = u.saveStore * 60 * 1000 //TODO add* 60 to get hours 

            setTimeout(() => {
                this.deactivateShopper(newId)
            }, ms);
            return newId;
        }
        catch {
            //TODO
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

    getOrder_hasShopperId = (orderId) => {
        //TODO find where shopperId not null
        let col = db.collection('orders').find({ orderId: orderId }).toArray();

        return col;
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
//TODO //HELP update to change active in order to false and add shopId 
//TODO small documents in database? 
//HELP stop setInterval client - customer - useEffect