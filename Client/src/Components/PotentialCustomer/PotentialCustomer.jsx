import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { serverSaveBuy } from "../../api/serverSaveBuy";
import Context from "../../context/context";
import '../PotentialCustomer/PotentialCustomer.css'
import { serverAddChat } from "../../api/serverChat";
import { ServerGetUser } from "../../api/serverSettings";
import { useEffect, useState } from "react";

export const PotentialCustomer = ({ order, setOrder, shopId, setChatId, setShowChat }) => {
    const _navigate = useNavigate(Context);
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function fetchData() {
            ServerGetUser().then(
                user => {
                    setUser(JSON.parse(user))
                }
            )
        }
        fetchData();
    }, []);

    const removeOrder = () => {
        const updatedOrders = [...order.slice(1)];
        setOrder(updatedOrders);
    }

    const saveBuy = (orderId) => {
        serverSaveBuy(orderId, shopId)
            .then(() => {
                setChatId(orderId)
                serverAddChat(order[0]['user'].id)
                setShowChat(order[0]['user'].id)
            }
            ).then(
                () => {
                    removeOrder()
                    _navigate('/chat')
                }
            )

    }

    if (order.length > 0) {
        let currrent_order = order[0]
        if (!user) {
            return <Loading />
        }
        return <Popup open={true} position="right center">
            <audio src='/src/assets/mp3/mp3.mp3' autoPlay="true" ></audio>
            <div className="PotentialCustomer">

                <img className="logo" src="src/assets/img/logo.png" width="100px" />
                <p > היי{user.name},<br />  {currrent_order['user'].name} רוצה <br />
                    מוצר - {currrent_order['order'].productName}
                    <br />
                    ופרטים נוספים: {currrent_order['order'].details}  <br />
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