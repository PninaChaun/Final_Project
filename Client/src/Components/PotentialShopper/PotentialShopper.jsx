import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { useContext, useState } from "react";
import { serverSaveBuy } from "../../api/serverSaveBuy";
import Context from "../../context/context";

export const PotentialShopper = ({ shopper, setShopper }) => {
    const _navigate = useNavigate(Context);

    const openChat = () => {
        setShopper(null)
        //TODO open chat shopper.chatId
        // Chat(chatId)

    }

    //     //TODO הפופאפ נסגר כשלוחצים איפהשהוא במסך 
    console.log(shopper, 'shopper!');
    if (shopper != null) {
        console.log('open popup', shopper);
        return <Popup open={true} position="right center">
            <div>
                <h1>{shopper['user'].email}</h1>
            <p>שם: {shopper['user'].name}  <br/>
            חנות: {shopper['shopper'].store}
            </p>
                <button type="submit" onClick={() => openChat()} >  פתיחת צא'ט </button>
            </div>
        </Popup>
    }
}
export default PotentialShopper;