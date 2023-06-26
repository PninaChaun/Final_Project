import { useEffect } from "react";
import { useState } from "react";
import { ServerGetUser, ServerUpdateUser } from "../../api/serverSettings";
import { useNavigate } from "react-router-dom";
import Context from "../../context/context";



export const Settings =  () => {

    const [user,setUser]=useState(null);
    const _navigate = useNavigate(Context);

    useEffect(() => {
        async function fetchData() {
        ServerGetUser().then(
            user=>{
                console.log(user);
                setUser(JSON.parse(user))
            }
        )
          
        }
        fetchData();
      }, []);


    const saveChanges=($event)=>{
        event.preventDefault();
        
        ServerUpdateUser(user).then(console.log('update user'))
        _navigate('/');
    }

    if (!user) {
        return  <div>Loading...</div>;
      }
    return <div>
         <h1>{user.name}</h1>
        <form  onSubmit={saveChanges}>
            <label htmlFor="saveOrder">שמירת הזמנה</label>
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
           {/* //TODO שינוי קבוצה*/ }
           <br />
           <button type="submit">אישור</button>
        </form>
    </div>

}