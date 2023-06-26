import { useNavigate } from "react-router-dom"
import { ServerOrder } from "../../api/serverOrder";
import Context from "../../context/context";

export const Customer = () => {
     const _navigate = useNavigate(Context);
     const sendOrder=($event)=>{
          event.preventDefault ()
          let productName = event.target.productName.value;
          let details = event.target.details.value;
          let order ={ productName:productName, details:details }
     
          ServerOrder(order)
          //TODO  קריאת שרת לשמירת ההזמנה

          _navigate('/');
     }

     return <>
     <form onSubmit={sendOrder}>
     <input type="text" name="productName" id="productName" placeholder="שם מוצר" />
          <textarea name="details" id="details" cols="30" rows="10" placeholder=":פרטים נוספים"/>
          <button type="submit">אישור הזמנה</button>
     </form>
         
     </>




}