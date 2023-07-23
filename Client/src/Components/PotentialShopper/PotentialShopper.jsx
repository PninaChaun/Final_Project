import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { useContext, useState } from "react";
import { serverSaveBuy } from "../../api/serverSaveBuy";
import Context from "../../context/context";
import '../PotentialShopper/PotentialShopper.css'




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
                            <img className="logo" src="src/assets/img/logo.png" width="100px" />

            <div className="UserShopper">
                {/* <h1>{shopper['user'].email}</h1> */}
            <p className="shopperUser">שם: {shopper['user'].name}  <br/>
            חנות: {shopper['shopper'].store}
            </p>
                <button className="PotentialShopper" type="submit" onClick={() => openChat()} >  פתיחת צא'ט </button>
                <img className="poket" src="src/assets/img/poket.png" width="100px" />

            </div>
        </Popup>
    }
}
export default PotentialShopper;