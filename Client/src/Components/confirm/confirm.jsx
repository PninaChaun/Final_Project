import { useEffect, useState } from "react"
import { ServerDeleteOrder, ServerMyOrders } from "../../api/serverOrder"
import Popup from "reactjs-popup"


export const Confirm = ({orderId, setOrderId, reload, setReload}) => {
   
    const deleteOrder = ()=>{
        setOrderId(null)
        ServerDeleteOrder(orderId)
        .then(()=>{setReload(!reload)})
    }
      

    if (orderId != null) {
        return <Popup open={true} position="right center">

            <img className="logo" src="src/assets/img/logo.png" width="100px" />
            <div className="UserShopper">
                <p className="shopperUser">האם ברצונך לבטל הזמנה זו? <br /> </p>
                <button className="PotentialShopper" type="submit" onClick={() => deleteOrder()} > ביטול הזמנה</button>
                {/* <img className="poket" src="src/assets/img/poket.png" width="100px" /> */}

            </div>
        </Popup>
    }
    
}   
