import { useEffect } from "react";
import { useState } from "react";
import { ServerGetUser, ServerUpdateUser } from "../../api/serverSettings";
import { useNavigate } from "react-router-dom";
import Context from "../../context/context";
import '../Settings/Settings.css'
import { Loading } from "../Loading/Loading";



export const Settings =  () => {

    const [user,setUser]=useState(null);
    const _navigate = useNavigate(Context);

    useEffect(() => {
        async function fetchData() {
        ServerGetUser().then(
            user=>{
                setUser(JSON.parse(user))
            }
        )
          
        }
        fetchData();
      }, []);


    const saveChanges=($event)=>{
        event.preventDefault();
        
        ServerUpdateUser(user)
        _navigate('/');
    }

    if (!user) {
        return   <Loading />
      }
    return <div>
            <img className="settings" src="src/assets/img/settings.gif" width="150px" />
    
         <h1 className="name">{user.name}</h1>
        <form  className="form" onSubmit={saveChanges}>
            <label  htmlFor="saveOrder">שמירת הזמנה</label>
            <br />
            <input type="number" name="saveOrder" id="saveOrder" placeholder="משך זמן שמירת ההזמנה" value={user.saveOrder} onChange={(e)=>setUser({...user, 'saveOrder':e.target.value})}/>
            <br />
            <label htmlFor="saveStore">שמירת הליכה לחנות</label>
            <br />
            <input type="number" name="saveStore" id="saveStore" placeholder="משך זמן שמירת ההליכה לחנות" value={user.saveStore}  onChange={(e)=>setUser({...user, 'saveStore':e.target.value})}/>
            <br />
            <label htmlFor="name">שם משתמש</label>
            <br />
            <input type="text" name="name" id="name" placeholder="שם משתמש" value={user.name} onChange={(e)=>setUser({...user, 'name':e.target.value})} />
            <br />
            <label htmlFor="email">אימייל</label>
            <br />
            <input type="email" name="email" id="email" placeholder="אימייל"  value={user.email} onChange={(e)=>setUser({...user, 'email':e.target.value})}/>
           <br />
           <button className="submit" type="submit">אישור</button>
        </form>
    </div>

}