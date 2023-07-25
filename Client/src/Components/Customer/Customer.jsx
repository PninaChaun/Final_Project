import { json, useNavigate } from "react-router-dom"
import { ServerOrder } from "../../api/serverOrder";
import Context from "../../context/context";
import { useEffect, useState } from "react";
import { FindShopper } from "../../api/serverFindShopper";
import './Customer.css'
import { ServerGetUser } from "../../api/serverSettings";

export const Customer = ({ setShopper }) => {
     const [found, setFound] = useState(false)
     const [user,setUser]=useState(null);
     const _navigate = useNavigate(Context);
     let orderId = null


     useEffect(() => {
          let intervalId = setInterval(() => {
               if (orderId) {
                    FindShopper(orderId)
                         .then(r => JSON.parse(r))
                         .then(r => {
                              if (Object.keys(r).length !== 0) {
                                   setShopper(r);
                                   clearInterval(intervalId);
                              }
                         });
               }
          }, 5000);

     }, []);




     const saveOrder = ($event) => {
          event.preventDefault()
          let productName = event.target.productName.value;
          let details = event.target.details.value;
          let order = { productName: productName, details: details }

          const x =  ServerOrder(order)

               .then((result) => JSON.parse(result))
               .then((result) => {
                    orderId = result.orderId
               })
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
     return <>
          <img className="logo" src="src/assets/img/logo.png" width="150px" />
          <img className="bag" src="src/assets/img/bag.gif" width="300px" />
     {/* ///TODO הוא שולף לי את האדם אך נופל אחכ בעקבות התרענון */}
          {/* <h2 className="hello">היי{user.name},</h2> */}
          <h4 className="startCustomer">ספר לנו מה ברצונך לקנות</h4>
          <form className="fo" onSubmit={saveOrder}>

               <label className="lableProduct" htmlFor="">שם מוצר: </label>
               <br />
               {/* <label className="lableProduct" htmlFor="product">שם מוצר</label> */}
               <input className="productName" type="text" name="productName" id="productName" placeholder=" חלב" />
               <textarea className="details" name="details" id="details" cols="30" rows="10" placeholder="הקלד כאן פרטים נוספים:" />
               <button className="submit2" type="submit">אישור </button>
          </form>

     </>





}