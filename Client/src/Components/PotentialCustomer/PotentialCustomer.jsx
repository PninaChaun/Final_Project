import { useNavigate } from "react-router-dom";
import Context, { PopupContext } from "../../context/context";
import Popup from 'reactjs-popup';
import { useContext, useState } from "react";

export const PotentialCustomer = ()=>{
    const _navigate = useNavigate(Context);
    const [show, setShow]= useState(PopupContext)

    let customer = {name:'n', productName: 'p', details:'d', address:'ad'}
    
    // /onClose={() => setShow(false)}
    //TODO הפופאפ נסגר כשלוחצים איפהשהוא במסך
    return <Popup open={show}  position="right center">
        <div>
            <p>שם: {customer.name}  <br/>
            מוצר : {customer.productName}  <br/>
            פרטים נוספים: {customer.details}  <br/>

            כתובת: {customer.address}  <br/>
            </p>
            {/* //TODO function to אישור */}
            <button type="submit" onClick={()=>setShow (false)}>אישור קניה</button>
            <button type="submit" onClick={()=>setShow (false)} >לא מאשר קניה </button>        
        </div>
    </Popup>
}
export default PotentialCustomer;