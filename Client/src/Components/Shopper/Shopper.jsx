import { useNavigate } from "react-router-dom";
import { ServerShopper } from "../../api/serverShopper";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Context from "../../context/context";
import '../Shopper/Shopper.css';
import { ServerGroups } from "../../api/serverGroups";
import { ServerGetUser } from "../../api/serverSettings";
import { Loading } from "../Loading/Loading";
import { useAlert } from "react-hook-popup";
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
export const Shopper = ({ order, setOrder, shopId, setshopId }) => {

     const [user, setUser] = useState(null);
     const [showGroups, setShowGroups] = useState(true);
     const [groups, setGroups] = useState([]);
     const _navigate = useNavigate(Context);
     const [checked, setChecked] = useState([]);
     const [alert] = useAlert()

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

     const saveShopper = ($event) => {
          event.preventDefault();
          Cookies.set('prevRequest', new Date(1970, 1))

          const store = event.target.store.value;
          let group_ids = checked
          if (group_ids.length == 0) {
               alert('לא ניתן לעדכן הליכה לחנות ללא בחירת קבוצות')
               return
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
                                   <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {groups.map((value) => {
                                             const labelId = `checkbox-list-label-${value}`;

                                             return (
                                                  <ListItem
                                                       key={value.id}

                                                       disablePadding
                                                  >
                                                       <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                            <ListItemIcon>
                                                                 <Checkbox
                                                                      edge="start"
                                                                      checked={checked.indexOf(value.id) !== -1}
                                                                      tabIndex={-1}
                                                                      disableRipple
                                                                      inputProps={{ 'aria-labelledby': labelId }}

                                                                 // color="#FF0000"
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
                    <button className="submitShopper" type="submit" disabled={shouldDisableSave()}>שמירה </button>
               </form>
          </div>
     }
}