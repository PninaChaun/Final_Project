import { json, useNavigate } from "react-router-dom"
import { ServerOrder } from "../../api/serverOrder";
import Context from "../../context/context";
import { useEffect, useState } from "react";
import { FindShopper } from "../../api/serverFindShopper";

export const Customer = ({setShopper }) => {
     const [found,setFound]=useState(false)
     const _navigate = useNavigate(Context);
     let orderId = null
     useEffect(() => {
          let intervalId;
        console.log("found", found)
          if (!found) {
            intervalId = setInterval(() => {
              if (orderId) {
                 FindShopper(orderId)
                   .then(r => JSON.parse(r))
                   .then(r => {
                     if (Object.keys(r).length !== 0) {
                       setShopper(r);
                     }
                     setFound(true);
                     console.log(found, "fou4");
                   });
              }
              console.log(found, "fou");
            }, 5000);
          }
        
          return () => {

            if (intervalId) {
              clearInterval(intervalId);
            }
          };
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