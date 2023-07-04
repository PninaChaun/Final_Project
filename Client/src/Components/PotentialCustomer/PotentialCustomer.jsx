import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { useContext, useState } from "react";
import { serverSaveBuy } from "../../api/serverSaveBuy";
import Context from "../../context/context";

export const PotentialCustomer = ({order, setOrder})=>{
    const _navigate = useNavigate(Context);

    const removeOrder=()=>{
        setOrder(order.splice(1))
    }

    const saveBuy = (orderId)=>{
        serverSaveBuy(orderId)
        removeOrder()

        //TODO open chat 
        
    }

console.log(order, 'Potential_customer');
    
    //TODO הפופאפ נסגר כשלוחצים איפהשהוא במסך
    if(order.length>0){
        let currrent_order = order[0]
        console.log(currrent_order,'current_order');
            
    return <Popup open={true}  position="right center">
        <div>
            <h1>{currrent_order['order'].orderId}</h1>
            <p>שם: {currrent_order['user'].name}  <br/>
            מוצר : {currrent_order['order'].productName}  <br/>
            פרטים נוספים: {currrent_order['order'].details}  <br/>

            כתובת: {currrent_order['user'].address}  <br/>
            </p>
            <button type="submit" onClick={()=>saveBuy(currrent_order['order'].orderId)}>אישור קניה</button>
            <button type="submit" onClick={()=>removeOrder()} >לא מאשר קניה </button>        
        </div>
    </Popup>
    }
}
export default PotentialCustomer;