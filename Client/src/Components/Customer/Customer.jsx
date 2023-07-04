import { useNavigate } from "react-router-dom"
import { ServerOrder } from "../../api/serverOrder";
import Context from "../../context/context";
import { useEffect } from "react";
import { FindShopper } from "../../api/serverFindShopper";

export const Customer = ({setShopper}) => {
     const _navigate = useNavigate(Context);
     let orderId= null
     useEffect(() => {
          
          let found = false
          setInterval(() => {
               if(orderId){
                  FindShopper(orderId).then(
                    r=> {
                    if(r != {}) 
                         setShopper(r)
                         console.log(r);
                         found = true
                    }
                  ) 

               }
               if(found)
               return //stop searching for shopper
          }
            , 5000); // fetch updates every 5 seconds
      
        }, []);
      

     const saveOrder=($event)=>{
          event.preventDefault ()
          let productName = event.target.productName.value;
          let details = event.target.details.value;
          let order ={ productName:productName, details:details }
     // HELP why this not working
         ServerOrder(order).then(r => JSON.parse(r)).then(r=> orderId=r.orderId)
          console.log(orderId,'orderId');
          _navigate('/');
     }

     return <>
     <form onSubmit={saveOrder}>
     <input type="text" name="productName" id="productName" placeholder="שם מוצר" />
          <textarea name="details" id="details" cols="30" rows="10" placeholder=":פרטים נוספים"/>
          <button type="submit">אישור הזמנה</button>
     </form>
         
     </>




}