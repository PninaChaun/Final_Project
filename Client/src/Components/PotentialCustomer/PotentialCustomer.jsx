import { useNavigate } from "react-router-dom";
import Context, { PopupContext } from "../../context/context";
import Popup from 'reactjs-popup';
import { useContext, useState } from "react";

export const PotentialCustomer = ({order, setOrder})=>{
    const _navigate = useNavigate(Context);
    // const [order, setOrder]= useContext(PopupContext)

    const removeOrder=()=>{
        setOrder(order.splice(1))
    }

    const saveBuy = (orderId)=>{
        saveBuy(orderId)

        //TODO open chat
        
        removeOrder()
    }

//TODO להבין מתי נשלח לפה, כשיש ORDER  חדש
console.log(order, 'Potential_customer');
    // let customer = {name:'n', productName: 'p', details:'d', address:'ad'}
    
    // /onClose={() => setShow(false)}
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
            {/* //TODO function to אישור */}
            <button type="submit" onClick={()=>saveBuy(currrent_order['order'].orderId)}>אישור קניה</button>
            <button type="submit" onClick={()=>removeOrder()} >לא מאשר קניה </button>        
        </div>
    </Popup>
    }
}
export default PotentialCustomer;