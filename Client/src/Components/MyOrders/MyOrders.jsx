import { useEffect, useState } from "react"
import { ServerDeleteOrder, ServerMyOrders } from "../../api/serverOrder"
import { Loading } from "../Loading/Loading"
import { useConfirm } from 'react-hook-popup'

export const MyOrders = () => {
    const [orders, setOrders] = useState(null)
    const [reload, setReload] = useState(true)
    const [confirm] = useConfirm()


    useEffect(() => {
        ServerMyOrders()
            .then(r => JSON.parse(r))
            .then(r => setOrders(r))
    }, [reload])

    const removeOrder = async (orderId) => {
        const confirmed = await confirm('למחוק הזמנה?')
        if (confirmed) {
            ServerDeleteOrder(orderId)
                .then(() => { setReload(!reload) })

        } else {
            console.log('not deleting');
        }
    }

    const formatDate = (datetime, part) => {
        if (part == 'date') {
            let date = datetime.split('T')[0]
            return date
        }
        else {
            let time = datetime.split('T')[1]
            let hours = time.split('.')[0].split(':')[0]
            let minutes = time.split('.')[0].split(':')[1]
            return hours + ':' + minutes
        }

    }
    if (orders == null)
        return <Loading />
    else
        return <>
            <div className="div">
                <table className="user-table" >
                    <thead>
                        <tr>
                            <th className="title">תאריך:</th>
                            <th className="title">שעה:</th>
                            <th className="title">מוצר:</th>
                            <th className="title">פרטים נוספים </th>
                            <th className="title"> ביטול הזמנה </th>

                        </tr>
                    </thead>
                    <tbody>
                        {console.log(orders, 'orders')}
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <th>{formatDate(order.beginDate, 'date')}</th>
                                <th>{formatDate(order.beginDate, 'time')}</th>
                                <th>{order.productName}</th>
                                <th>{order.details}</th>
                                <th><img src="src/assets/img/garbage.png" alt="" width="30px" onClick={() => { removeOrder(order.orderId) }} /></th>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
}