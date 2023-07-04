import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { useContext, useState } from "react";
import { serverSaveBuy } from "../../api/serverSaveBuy";
import Context from "../../context/context";

export const PotentialShopper = ({shopper})=>{
    const _navigate = useNavigate(Context);

    const openChat =()=>{
        //TODO open chat shopper.chatId
        // Chat(chatId)

    }
    
//     //TODO הפופאפ נסגר כשלוחצים איפהשהוא במסך
    if(shopper !={}){
            
    return <Popup open={true}  position="right center">
        <div>
            <h1>{shopper.name}</h1>
            <p>שם: {shopper.name}  <br/>
            חנות: {shopper.store} 
            
            </p>
            <button type="submit" onClick={()=>openChat()} >  פתיחת צא'ט </button>
        </div>
    </Popup>
    }
}
export default PotentialShopper;