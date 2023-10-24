import { useEffect, useState } from "react"
import { ServerDeleteOrder, ServerMyOrders } from "../../api/serverOrder"
import { Confirm } from "../confirm/confirm"


export const MyOrders = () => {
    const [orders, setOrders] = useState([])
    const [confirm, setConfirm] = useState(null)
    const [reload, setReload] = useState(true)
 

    useEffect(()=>{
        ServerMyOrders()
        .then(r=>JSON.parse(r))
        .then(r=>setOrders(r) )
    },[reload])

const removeOrder=(orderId)=>{
    setConfirm(orderId)
    
}

    return <>                
                <div className="div">
                <table className="user-table" >
                    <thead>
                        <tr>
                            <th className="title">תאריך:</th>
                            <th className="title">מוצר:</th>
                            <th className="title">פרטים נוספים </th>
                            <th className="title"> ביטול הזמנה </th>

                        </tr>
                    </thead>
                    <tbody>
                        {console.log(orders, 'orders')}
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <th>{order.beginDate}</th>
                                <th>{order.productName}</th>
                                <th>{order.details}</th>
                                <th><img src="src/assets/img/logo.png" alt="" width="30px" onClick={()=>{removeOrder(order.orderId)}} /></th>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
                        <Confirm orderId = {confirm} setOrderId={setConfirm} reload={reload} setReload={setReload}/>

</>

}