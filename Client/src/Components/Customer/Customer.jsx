import { json, useNavigate } from "react-router-dom"
import { ServerOrder } from "../../api/serverOrder";
import Context from "../../context/context";
import { useEffect, useState } from "react";
import { FindShopper } from "../../api/serverFindShopper";
import './Customer.css'
import { ServerGetUser } from "../../api/serverSettings";

export const Customer = ({ setShopper }) => {
     const [found, setFound] = useState(false)
     const [user, setUser] = useState(null);
     const _navigate = useNavigate(Context);
     // let orderId = null
     const [orderId, setOrderId] = useState(null)


     useEffect(() => {
          let intervalId = setInterval(() => {
               console.log(orderId, "useeffect");
               if (orderId != null) {
                    FindShopper(orderId)
                         .then(r => JSON.parse(r))
                         .then(r => {
                              console.log('Object.keys(r).length', Object.keys(r).length);
                              if (Object.keys(r).length > 0) {
                                   console.log('r in customer', r);
                                   setShopper(r);
                                   clearInterval(intervalId);
                              }
                         });
               }
          }, 5000);

     }, [orderId]);

     const saveOrder = ($event) => {
          event.preventDefault()
          let productName = event.target.productName.value;
          let details = event.target.details.value;
          let order = { productName: productName, details: details }
         
          ServerOrder(order)
               .then((result) => JSON.parse(result))
               .then((result) => {
                    console.log(result.orderId, 'orderID');
                    setOrderId(result.orderId)  
                    // TODO הorderId לא מתעדכן ולכן לא נשלחת קריאת שרת לחפש קונה
               })
               .then(()=>
                    console.log(orderId,'id')  
               )
               .catch((error) => {
                    console.log(error);
               })
      .finally(() => _navigate('/'));
     }

     useEffect(() => {
          async function fetchData() {
               ServerGetUser()
                    .then(r => JSON.parse(r))
                    .then(r => {
                         setUser(r)
                    });
          }
          fetchData();
     }, []);
     if (user == null){
          return <>loading...</>
     }
     return <>
     
          <img className="bag" src="src/assets/img/bag.gif" width="300px" />
          <h2 className="hello">היי{user.name},</h2>
          <h4 className="startCustomer">ספר לנו מה ברצונך לקנות</h4>
          <form className="fo" onSubmit={saveOrder}>

               <label className="lableProduct" htmlFor="">שם מוצר: </label>
               <br />
               {/* <label className="lableProduct" htmlFor="product">שם מוצר</label> */}
               <input className="productName" type="text" name="productName" id="productName" placeholder=" חלב" />
               <textarea className="details" name="details" id="details" cols="30" rows="10" placeholder="הקלד כאן פרטים נוספים:" />
               <button className="submit2" type="submit">אישור </button>
               <h4>{orderId}</h4>
          </form>

     </>





}