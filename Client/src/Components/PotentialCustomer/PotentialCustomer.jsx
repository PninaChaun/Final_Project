import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { useContext, useEffect, useState } from "react";
import { serverSaveBuy } from "../../api/serverSaveBuy";
import Context from "../../context/context";
import '../PotentialCustomer/PotentialCustomer.css'

export const PotentialCustomer = ({ order, setOrder, shopId }) => {
    const _navigate = useNavigate(Context);

    const removeOrder = () => {
        console.log(' b4 removed from array', order);
        const updatedOrders = [...order.slice(1)];
        setOrder(updatedOrders);
        console.log('removed from array', order);
    }

    const saveBuy = (orderId) => {
        serverSaveBuy(orderId, shopId)
        removeOrder()

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