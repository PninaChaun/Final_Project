import { json, useNavigate } from "react-router-dom"
import { ServerOrder } from "../../api/serverOrder";
import Context from "../../context/context";
import { useEffect } from "react";
import { FindShopper } from "../../api/serverFindShopper";

export const Customer = ({setShopper }) => {
     const _navigate = useNavigate(Context);
     let orderId = null
     useEffect(() => {

          let found = false
   
          setInterval(() => {
               if (orderId) {
                    FindShopper(orderId)
                    .then(r=>JSON.parse(r))
                    .then(
                         r => {
                              if (r != {})
                                   setShopper(r)
                               
                              found = true
                         }
                    )
               }
               if (found)
                    return //stop searching for shopper
          }
               , 5000); // fetch updates every 5 seconds
   
     }, []);



     const saveOrder = ($event) => {
          event.preventDefault()
          let productName = event.target.productName.value;
          let details = event.target.details.value;
          let order = { productName: productName, details: details }
          
          const x = ServerOrder(order)
               .then((result) => JSON.parse(result))
               .then((result) => {
                    orderId = result.orderId
               })
               .catch((error) => {
                    console.log(error);
               })
               .finally(() => _navigate('/'));
     }

     return <>
          <form onSubmit={saveOrder}>
               <input type="text" name="productName" id="productName" placeholder="שם מוצר" />
               <textarea name="details" id="details" cols="30" rows="10" placeholder=":פרטים נוספים" />
               <button type="submit">אישור הזמנה</button>
          </form>

     </>





}