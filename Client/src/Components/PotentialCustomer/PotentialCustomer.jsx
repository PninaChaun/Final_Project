import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { useContext, useEffect, useState } from "react";
import { serverSaveBuy } from "../../api/serverSaveBuy";
import Context from "../../context/context";
import '../PotentialCustomer/PotentialCustomer.css'
import { serverAddChat } from "../../api/serverChat";

export const PotentialCustomer = ({ order, setOrder, shopId, setChatId, setShowChat}) => {
    const _navigate = useNavigate(Context);

    const removeOrder = () => {
        const updatedOrders = [...order.slice(1)];
        setOrder(updatedOrders);
    }

    const saveBuy = (orderId) => {
        console.log(orderId,'orderid');
        
        serverSaveBuy(orderId, shopId)
        .then(()=>{
            setChatId(orderId)
            console.log(order[0]['user'].id,'order.userId');
            serverAddChat(order[0]['user'].id)
            setShowChat(order[0]['user'].id)
        }
        ).then(
            ()=>{
            removeOrder()
            }
        )
        
        _navigate('/chat')

        //TODO open chat 
    }

    //TODO הפופאפ נסגר כשלוחצים איפהשהוא במסך
    if (order.length > 0) {
        let currrent_order = order[0]

        return <Popup open={true} position="right center">
            <div className="PotentialCustomer">

            <img className="logo" src="src/assets/img/logo.png" width="100px" />
            <p>{order.length}</p>
                <p >שם: {currrent_order['user'].name}  <br />
                    מוצר : {currrent_order['order'].productName}  <br />
                    פרטים נוספים: {currrent_order['order'].details}  <br />

                    כתובת: {currrent_order['user'].address}  <br />
                </p>
                <button className="submitCustomer" type="submit" onClick={() => saveBuy(currrent_order['order'].orderId)}>אישור קניה</button>
                <button type="submit" className="submitCustomer" onClick={() => removeOrder()} >לא מאשר קניה </button>
                 <br />     <br />   
                
            </div>
        </Popup>
    }
}
export default PotentialCustomer;