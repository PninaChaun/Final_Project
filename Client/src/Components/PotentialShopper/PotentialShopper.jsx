import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { useContext, useState } from "react";
import { serverSaveBuy } from "../../api/serverSaveBuy";
import Context from "../../context/context";
import '../PotentialShopper/PotentialShopper.css'
import { serverAddChat } from "../../api/serverChat";

export const PotentialShopper = ({ shopper, setShopper,setChatId, orderId, setShowChat }) => {
    const _navigate = useNavigate(Context);

    const openChat = () => {
        setChatId(orderId)
        serverAddChat(shopper['user'].id)
        setShowChat(shopper['user'].id)
        setShopper(null)
        _navigate('/chat')

    }
    //     //TODO הפופאפ נסגר כשלוחצים איפהשהוא במסך 
    if (shopper != null) {
        return <Popup open={true} position="right center">
            {/* <audio src='/src/assets/mp3/mp3.mp3' autoPlay="true" ></audio> */}

            <img className="logo" src="src/assets/img/logo.png" width="100px" />
            <div className="UserShopper">
                { console.log(shopper) }
                <p className="shopperUser">שם: {shopper['user'].name}  <br />
                    חנות: {shopper['shopper'].store}
                </p>
                <button className="PotentialShopper" type="submit" onClick={() => openChat()} >  פתיחת צא'ט </button>
                <img className="poket" src="src/assets/img/poket.png" width="100px" />

            </div>
        </Popup>
    }
}
export default PotentialShopper;