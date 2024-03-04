import { useNavigate } from "react-router-dom"
import { ServerOrder } from "../../api/serverOrder";
import Context from "../../context/context";
import { useEffect, useState } from "react";
import './Customer.css'
import { ServerGetUser } from "../../api/serverSettings";
import { ServerGroups } from "../../api/serverGroups";
import { Loading } from "../Loading/Loading";
import '../Shopper/Shopper.css';
import { useAlert } from "react-hook-popup";
import { List, ListItem, ListItemIcon, ListItemButton, Checkbox, ListItemText, Button } from '@mui/material'

export const Customer = ({ setOrderId }) => {
     const [user, setUser] = useState(null);
     const [groups, setGroups] = useState([]);
     const [showGroups, setShowGroups] = useState(true);
     const [checked, setChecked] = useState([]);
     const [alert] = useAlert()

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
                         if (r.length == 0)
                              alert('לא תוכל לבצע הזמנה- כי אינך חבר בקבוצה')
                         setGroups(r)
                    });
          }

          fetchData();
     }, []);

     useEffect(()=>{
          
          const newChecked = [];
          for (let index = 0; index < groups.length; index++)
               newChecked.push(groups[index].id)

          setChecked(newChecked);
     }, [groups])

     const handleToggle = (value) => () => {
          const currentIndex = checked.indexOf(value.id);
          const newChecked = [...checked];

          if (currentIndex === -1) {
               newChecked.push(value.id);
          } else {
               newChecked.splice(currentIndex, 1);
          }

          setChecked(newChecked);
     };

     const saveOrder = ($event) => {
          event.preventDefault()
          let productName = event.target['productName'].value;
          let details = event.target.details.value;
          let group_ids = checked
          if (group_ids.length == 0) {
               alert('לא ניתן ליצור הזמנה ללא בחירת קבוצות')
               return
          }
          let order = { 'productName': productName, 'details': details, 'groups': group_ids }
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

     const shouldDisableSave = () => {
          if (groups == null)
               return true
          if (groups.length == 0)
               return true
          return false
     }

     if (user != null)
          return <>
               <img className="bag" src="src/assets/img/bag.gif" width="300px" />
               <h2 className="hello"> היי {user.name},</h2>
               <h4 className="startCustomer">ספר לנו מה ברצונך לקנות</h4>
               <form className="fo" onSubmit={saveOrder}>
                    <label htmlFor="">באיזה קבוצה אתה מעונין:</label>
                    <Button onClick={() => {
                         event.preventDefault()
                         setShowGroups(!showGroups)
                    }}><img src="src/assets/img/down-arrow.png" height="10px" /></Button>
                    <div hidden={!showGroups}>
                         {groups ?
                              <>
                                   <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {groups.map((value) => {
                                             const labelId = `checkbox-list-label-${value}`;

                                             return (
                                                  <ListItem
                                                       key={value.id}
                                                       disablePadding>
                                                       <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                            <ListItemIcon>
                                                                 <Checkbox
                                                                      edge="start"
                                                                      checked={checked.indexOf(value.id) !== -1}
                                                                      tabIndex={-1}
                                                                      disableRipple
                                                                      inputProps={{ 'aria-labelledby': labelId }}                                                             // color="#FF0000"
                                                                 />
                                                            </ListItemIcon>
                                                            <ListItemText id={labelId} primary={value.name} />
                                                       </ListItemButton>
                                                  </ListItem>
                                             );
                                        })}


                                   </List>
                              </>
                              :
                              <>
                                   <Loading />
                              </>

                         }
                    </div>
                    <br />
                    <label className="lableProduct" htmlFor="">שם מוצר: </label>
                    <br />
                    <input className="productName" type="text"  name="productName" id="productName" placeholder=" חלב" />
                    <textarea className="details" name="details" id="details" cols="30" rows="10" placeholder="הקלד כאן פרטים נוספים:" />
                    <button className="submitShopper" type="submit" disabled={shouldDisableSave()}>אישור </button>
               </form>

          </>

}