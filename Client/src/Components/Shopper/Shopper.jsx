import { useNavigate } from "react-router-dom";
import { ServerShopper } from "../../api/serverShopper";
import PotentialCustomer from "../PotentialCustomer/PotentialCustomer";
import { useContext, useEffect, useState } from "react";
import { FindCustomer } from "../../api/serverFindCustomer";
import Cookies from "js-cookie";
import Context from "../../context/context";
import '../Shopper/Shopper.css';
import { ServerGroups } from "../../api/serverGroups";
import { ServerGetUser } from "../../api/serverSettings";
import { Loading } from "../Loading/Loading";
import { useAlert } from "react-hook-popup";
export const Shopper = ({ order, setOrder, shopId, setshopId }) => {
     const [user, setUser] = useState(null);
     const [showGroups, setShowGroups] = useState(true);
     const [groups, setGroups] = useState(null);
     const _navigate = useNavigate(Context);
     const[alert] = useAlert()


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
                         if (r.length == 0)
                         alert('לא תוכל לקנות לחברים - כי אינך חבר בקבוצה')
                         setGroups(r)
                    });
          }

          fetchData();
     }, []);

     const saveShopper = ($event) => {
          event.preventDefault();
          Cookies.set('prevRequest', new Date(1970, 1))

          const store = event.target.store.value;
          let group_ids = []
          for (let i = 0; i < groups.length; i++) {
               let group_id = groups[i].id
               let is_checked = event.target['group' + String(group_id)].checked
               if (is_checked) {
                    group_ids.push(group_id)
               }
          }
          let shopInfo = { 'store': store, "groups": group_ids }

          const x = ServerShopper(shopInfo)
               .then((result) => JSON.parse(result))
               .then((result) => {
                    setshopId(result)
                    _navigate('/');
               })
               .catch((error) => {
                    console.log(error);
               })
          // 
     }

     const shouldDisableSave = () => {
          if (groups == null)
               return true
          if (groups.length == 0)
               return true
          return false
     }

     if (user == null)
          return <>
               <Loading />
          </>
     else {
          return <div>

               <h2 className="hello"> היי {user.name ?? ''},</h2>
               <form onSubmit={saveShopper}>
                    <label className="labelShopper" htmlFor="">הכנס שם חנות:</label><br />
                    <input type="text" className="store" name="store" id="store" placeholder="יש " />
                    <br />
                    <label htmlFor="">לאיזה קבוצה אתה מעונין לקנות:</label>
                    <button onClick={() => {
                         event.preventDefault()
                         setShowGroups(!showGroups)
                    }}><img src="src/assets/img/down-arrow.png" height="10px" /> </button>
                    <div hidden={!showGroups}>
                         {groups ?
                              <>
                                   {groups.map((g) => (
                                        <div key={g.id}>
                                             <input type="checkbox" defaultChecked="true" id={g.id} name={'group' + g.id} />
                                             <label htmlFor={g.id}>{g.name} </label>
                                             <br />
                                        </div>
                                   ))}
                              </>
                              :
                              <>
                                   <Loading />
                              </>

                         }
                    </div>

                    <button className="submitShopper" type="submit" disabled={shouldDisableSave()}>שמירה </button>
               </form>
          </div>
     }
}