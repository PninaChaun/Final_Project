import { useEffect } from "react";
import { useState } from "react";
import { ServerGetUser, ServerUpdateUser } from "../../api/serverSettings";
import { useNavigate } from "react-router-dom";
import Context from "../../context/context";
import '../Settings/Settings.css'
import { Loading } from "../Loading/Loading";
import { TextField } from "@mui/material";



export const Settings = () => {

    const [user, setUser] = useState(null);
    const _navigate = useNavigate(Context);

    useEffect(() => {
        async function fetchData() {
            ServerGetUser().then(
                user => {
                    setUser(JSON.parse(user))
                }
            )

        }
        fetchData();
    }, []);

    const saveChanges = ($event) => {
        event.preventDefault();

        ServerUpdateUser(user)
            .then(() => _navigate('/'))
            .catch(() => alert('אימייל זה תפוס'))

    }

    if (!user) {
        return <Loading />
    }
    return <div>

        <h1 className="name">{user.name}</h1>
        <form className="form" onSubmit={saveChanges}>

            <TextField required type="number" name="saveOrder" id="saveOrder" label="משך זמן שמירת ההזמנה" value={user.saveOrder} onChange={(e) => setUser({ ...user, 'saveOrder': e.target.value })} />
            <br />

            <TextField required type="number" name="saveStore" id="saveStore" label="משך זמן שמירת ההליכה לחנות" value={user.saveStore} onChange={(e) => setUser({ ...user, 'saveStore': e.target.value })} />

            <br />
            <TextField required type="text" name="name" id="name" label="שם משתמש" value={user.name} onChange={(e) => setUser({ ...user, 'name': e.target.value })} />
            <br />
            <button className="submit" type="submit">אישור</button>
        </form>
    </div>

}