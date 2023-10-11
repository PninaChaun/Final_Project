import { useNavigate } from "react-router-dom"
import { ServerOrder } from "../../api/serverOrder";
import Context from "../../context/context";
import { useEffect, useState } from "react";
import { FindShopper } from "../../api/serverFindShopper";
import './Customer.css'
import { ServerGetUser } from "../../api/serverSettings";
import { ServerGroups } from "../../api/serverGroups";
import Cookies from "js-cookie";

export const Customer = ({ setOrderId }) => {
     const [user, setUser] = useState(null);
     const [groups, setGroups] = useState(null);
     const [showGroups, setShowGroups] = useState(true);

     const _navigate = useNavigate(Context);

     useEffect(() => {
          async function fetchData() {
               ServerGetUser()
                    .then(r => JSON.parse(r))
                    .then(r => {
                         setUser(r)
                    });

               ServerGroups()
                    .then(r => JSON.parse(r))
                    .then(r => {
                         setGroups(r)
                    });
          }

          fetchData();
     }, []);

     const saveOrder = ($event) => {
          event.preventDefault()
          let productName = event.target['productName'].value;
          let details = event.target.details.value;
          let group_ids = []
          for (let i = 0; i < groups.length; i++) {
               let group_id = groups[i].id
               let is_checked = event.target['group' + String(group_id)].checked
               if (is_checked) {
                    group_ids.push(group_id)
               }
          }
          let order = { productName: productName, details: details, groups: group_ids }

          ServerOrder(order)
               .then((result) => JSON.parse(result))
               .then((result) => {
                    setOrderId(result.orderId)
                    _navigate('/');
               })
               .catch((error) => {
                    console.log(error);
               })

     }


     if (user == null) {
          return <>loading...</>
     }
     return <>

          <img className="bag" src="src/assets/img/bag.gif" width="300px" />
          <h2 className="hello"> היי{user.name},</h2>
          <h4 className="startCustomer">ספר לנו מה ברצונך לקנות</h4>
          <form className="fo" onSubmit={saveOrder}>
               <label htmlFor="">באיזה קבוצה אתה מעונין:</label>
               <button onClick={() => {
                    event.preventDefault()
                    setShowGroups(!showGroups)
               }}>^</button>
               <div hidden={!showGroups}>
                    {groups ?
                         <>
                              {groups.map((g) => (
                                   <div key={g.id}>
                                        <input type="checkbox" checked="true" id={g.id} name={'group' + g.id} />
                                        <label htmlFor={g.id}>{g.name} </label>
                                        <br />
                                   </div>
                              ))}
                         </>
                         :
                         <>
                              <p>Loading groups...</p>
                         </>

                    }
               </div>
               <br />
               <label className="lableProduct" htmlFor="">שם מוצר: </label>
               <br />
               {/* <label className="lableProduct" htmlFor="product">שם מוצר</label> */}
               <input className="productName" type="text" name="productName" id="productName" placeholder=" חלב" />
               <textarea className="details" name="details" id="details" cols="30" rows="10" placeholder="הקלד כאן פרטים נוספים:" />
               <button className="submit2" type="submit">אישור </button>
          </form>

     </>

}