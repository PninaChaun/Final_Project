import { Injectable } from '@nestjs/common';
import { orderDTO } from 'src/DTO/order.dto';
import { ShopperDTO } from 'src/DTO/shopper';
import { UserDTO } from 'src/DTO/user.dto';
const { MongoClient } = require('mongodb');
import * as bcrypt from 'bcrypt';
import { group, log } from 'console';
import { inviteDTO } from 'src/DTO/invite.dto';
import { groupDTO } from 'src/DTO/group.dto';

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

    getUser = async (id: Number) => {
        let col = await db.collection('users').findOne({ id: id })

        return col;
    }

    getGroup = async (id: Number) => {
        let col = await db.collection('groups').findOne({ id: id })
        return col;
    }

    getInvite = async (id: Number) => {
        let col = await db.collection('invites').findOne({ id: id })
        return col;
    }

    getShop = (id: Number) => {
        let col = db.collection('shoppers').find({ shopId: id }).toArray();
        return col;
    }

    updateUser = async (user: UserDTO) => {
        let u = await this.getUser(user.id)

        db.collection('users').deleteOne({ id: user.id }).then(
            db.collection('users').insertOne({ ...u, ...user })
        )
        //TODO AFTER change delete-insert to replace
        // u = { ...u, ...user}
        //db.collection('users').replaceOne({ id: user.id },{...u})

        return 200;
    };

    insertUser = async (user: UserDTO) => {

        let newId = await this.getNextSequenceValue('users')

        user.saveOrder = user.saveOrder

        db.collection('users').insertMany([{ ...user, id: newId, groups: [] }])
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

    getAllOrders = async (user_groups: any, prevTime: Date) => {
        let orders = []
        let allOrders = await db.collection('orders').find({ active: true, beginDate: { $gt: prevTime } }).toArray()
        for(let i =0; i < allOrders.length; i++){
            console.log(allOrders[i]);
            console.log('groups-user',user_groups);
            
            for(let j = 0; j<user_groups.length; j++){
                if (user_groups[j].id == allOrders[i].groups){
                    orders.push(allOrders[i])
                    break
                }
            }
            
        }

        return {
            col: orders, newPrevDate: new Date()
        }


        // }

    }

    insertOrder = async (order: orderDTO) => {
        try {
            let newId = await this.getNextSequenceValue('orders')

            order.orderId = newId

            let u = await this.getUser(order.userId)
            let ms = u.saveOrder * 60 * 1000 * 60//TODO AFTER add* 60 to get hours 

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
        // let o = await this.getOrder(orderId)

        // o = o[0]
        // db.collection('orders').deleteOne({ orderId: orderId }).then(
        //     db.collection('orders').insertOne({ ...o, active: false })
        // )

        db.collection('orders').updateOne({ orderId: orderId }, { $set: { active: false } })

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

        let o = await this.getOrder(orderId)

        o = o[0]

        //TODO make sure this order is still available
        if (!o.active)
            return 404;

        db.collection('orders').updateOne({ orderId: orderId }, { $set: { active: false, shopId: shopId } })

        // db.collection('orders').deleteOne({ orderId: orderId }).then(
        //     db.collection('orders').insertOne({ ...o, active: false, shopId: shopId })
        // )

        return 200;
    }

    async insertShopper(shopper: ShopperDTO) {
        try {
            let newId = await this.getNextSequenceValue('shoppers')
            db.collection('shoppers').insertMany([{ ...shopper, shopId: newId }])

            let u = await this.getUser(shopper.userId)
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

    getGroupName = async (groupId) => {
        let group = await this.getGroup(groupId)
        return group.name
    }

    getMyGroups = async (userId) => {
        let user = await db.collection('users').findOne({ id: userId })

        if (user) {
            let groups_id = user['groups']

            let groups = []
            for (let i = 0; i < groups_id.length; i++) {
                let g_id = parseInt(groups_id[i])
                let groupName = await this.getGroupName(g_id)
                let groupIdName = { id: g_id, name: groupName }

                groups.push(groupIdName)

            }
            return groups
        }
    }

    getMembers = async (group_id) => {
        let group = await db.collection('groups').findOne({ id: group_id })
        if (group) {

            let members = []

            for (let i = 0; i < group['members'].length; i++) {
                let member_id = parseInt(group['members'][i])

                let member = await this.getUser(member_id)
                members.push({ id: member_id, name: member['name'], email: member['email'], member: true })
            }

            return members
        }

    }


    getInvites = async (group_id) => {
        let group = await db.collection('groups').findOne({ id: group_id })
        if (group) {
            let invites = []

            for (let i = 0; i < group['invites'].length; i++) {
                let invite_id = parseInt(group['invites'][i])

                let member = await this.getInvite(invite_id)
                invites.push({ id: invite_id, name: member['name'], email: member['email'], member: false })
            }

            return invites
        }

    }

    async insertinvite(invite: inviteDTO) {
        let newId = await this.getNextSequenceValue('invites')

        await db.collection('invites').insertMany([{ ...invite, id: newId }])
        return newId;
    }

    async addToGroupInvite(group_id, invite_id) {
        let group = await this.getGroup(group_id)

        await db.collection('groups').updateOne({ id: group_id }, { $set: { invites: [...group['invites'], invite_id] } })
        return 201;
    }

    async CreateGroup(group: groupDTO, member_id) {
        let newId = await this.getNextSequenceValue('groups')

        await db.collection('groups').insertMany([{ ...group, id: newId, members: [], invites: [] }])

        return newId;
    }

    async addMember(group_id, user_id) {        
        let group:groupDTO = await this.getGroup(group_id)
        let user = await this.getUser(user_id)
        if (group && user) {
            await db.collection('users').updateOne({ id: user_id }, { $set: { groups: [...user['groups'], group_id] } })
            await db.collection('groups').updateOne({ id: group_id }, { $set: { members: [...group['members'], user_id] } })
            return 200
        }
    }

    
    async DeleteMember(group_id, user_id) {
        let group = await this.getGroup(group_id)        
        let user = await this.getUser(user_id)
        if(group && user){
        await db.collection('users').updateOne({ id: user_id }, { $set: { groups: [...user['groups'].filter((g)=>g!=group_id)] } })
        await db.collection('groups').updateOne({ id: group_id }, { $set: { members: [...group['members'].filter((m)=>m!=user_id)] } })

        return 200
    }
    else{
        return 400
    }
}

getMyInvites= async (userId)=> {
    let user = await this.getUser(userId)
    let invites = await db.collection('invites').find({email:user.email}).toArray()
    return invites
}

getUserName = async (userId) =>{
    let user = await this.getUser(userId);
    return user.name
}

removeInvite = async (groupId, inviteId) =>{
    let group:groupDTO =await this.getGroup(groupId)
    await db.collection('groups').updateOne({id: groupId}, {$set:{invites:  [...group['invites'].filter((g)=>g!=inviteId)]}})
    await db.collection('invites').deleteOne({id:inviteId})
    return 201
}

}

//TODO maybe save once user in group