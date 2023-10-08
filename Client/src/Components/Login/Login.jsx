import { React, Component, useState } from "react";
import Cookies from 'js-cookie';
import { Serverlogin } from "../../api/serverLogin";
import { useNavigate } from "react-router";
import { Context } from "../../context/context";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../Login/Login.css'
import { Link } from 'react-router-dom'

export const Login = () => {
    const [login, setLogin] = useState(true);

    const _navigate = useNavigate(Context);
    const expireIn = 5 * 60 * 60 * 1000;
    const submit = async ($event) => {
        event.preventDefault();
        let user = {};
        if (login) {
            let email = event.target.lemail.value;
            let password = event.target.lpassword.value;
            if (/^(?=.*[a-zA-Z])[a-zA-Z\d]{4,}$/.test(password)) {
                console.log("Valid password");
            } else {
                event.target.lpassword.value = '';
            }

            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                console.log("Valid email address");
            } else {
                event.target.lemail.value = '';
            }
            user = { email: email, password: password }

        }
        else {
            let email = event.target.semail.value;
            let password = event.target.spassword.value;
            let password2 = event.target.spassword2.value;
            let name = event.target.sname.value;
            let saveOrder = event.target.saveOrder.value;
            let address = event.target.address.value;

            let saveStore = event.target.saveStore.value;

            if (password != password2) {
             alert("אימות סיסמא לא נכון")
                event.target.spassword2.value = ""
            }
            console.log(email, password, password2, name)
            //name
            if (!(/^[a-zA-Z]+$/.test(name))) {
                console.log('שם צריך להיות רק אותיות באנגלית');
                event.target.sname.value = '';
            }
            /////pasword
            if (/^(?=.*[a-zA-Z])[a-zA-Z\d]{4,}$/.test(password)) {
            } else {
                event.target.spassword.value = '';
            }
            ///email
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                console.log("Valid email address");
            } else {
                event.target.semail.value = '';
            }

            user = { email: email, password: password, name: name, saveOrder: saveOrder, saveStore: saveStore, address: address }
        }
        Serverlogin(user)
            .then(response => {
                response = JSON.parse(response)
                Cookies.set('token', response.access_token, { expires: new Date(new Date().getTime() + (expireIn)) })

                _navigate('/');

            })
            .catch(r => {
                console.log(r);
            }
            )
    }
    return <>
                       
        <div className="login2">
            <img className="login" src="src/assets/img/login.gif" width="300px" /></div>

        <span className="hi">שלום!  </span><br />
        <span className="startLogin"> בא נתחיל על ידי יצירת חשבון חינם</span>
        <form name="loginForm" onSubmit={submit}>

            {login ?
                <>
                    <button className="register" type="button" onClick={() => setLogin(false)}>להרשמה</button>
                    <br />
                    <input className="inputLogin " type="email" name="lemail" placeholder="username@domain.com" />
                    <br />
                    <input className="inputLogin " type="password" name="lpassword" id="lpassword" placeholder="הכנס סיסמא" />
                </>
                :
                <>
                    <button type="button" variant="contained" onClick={() => setLogin(true)}>להתחברות</button>
                    <input className="inputLogin " type="email" name="semail" placeholder="username@domain.com" />
                    <input className="inputLogin " type="password" name="spassword" id="spassword" placeholder="הכנס סיסמא" />
                    <input className="inputLogin " type="password" name="spassword2" id="spassword2" placeholder="אימות סיסמא" />
                    <input className="inputLogin " type="text" name="sname" id="sname" placeholder="הכנס שם" />
                    <input className="inputLogin " type="number" name="saveOrder" id="saveOrder" min={1} placeholder="משך זמן בשעות שמירת הזמנה" />
                    <input className="inputLogin " type="number" name="saveStore" id="saveStore" min={1} placeholder="משך זמן בשעות שמירת הליכה לחנות" />
                    <input className="inputLogin " type="text" name="address" id="address" placeholder="כתובת " />
                </>
            }
            <br />
            <button className="submitLogin" type="submit">אישור</button>
        </form>

    </>

}