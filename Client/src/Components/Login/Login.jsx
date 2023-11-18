import { React, Component, useState } from "react";
import Cookies from 'js-cookie';
import { ServerForgotPassword, ServerIfCodeTrue, ServerResetPassword, Serverlogin } from "../../api/serverLogin";
import { useNavigate } from "react-router";
import { Context } from "../../context/context";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../Login/Login.css'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-hook-popup';

export const Login = () => {
    const [login, setLogin] = useState(true);
    const _navigate = useNavigate(Context);
    const expireIn = 5 * 60 * 60 * 1000; //5 hours
    const [forgot, setForgot] = useState(false);
    const [codes, setCodes] = useState('email');
    const [email, setEmail] = useState('');
    const[alert] = useAlert()


    const forgotPassword = () => {
        setForgot(!forgot)
    }

    const codeInEmail = ($event) => {
        event.preventDefault()
        setEmail(event.target.email.value)
        setCodes('code')

        ServerForgotPassword(event.target.email.value)

    }
    

    const newPassword = ()=>{
        event.preventDefault()
        let pass = event.target.pass.value
        ServerResetPassword(email, pass)
        .then(r=>JSON.parse(r))
        .then(r=>{
            Cookies.set('token', r.access_token, { expires: new Date(new Date().getTime() + (expireIn)) })

            _navigate('/');
        })
    }

    const ifCodesTrue = () => {
        event.preventDefault()
        let code = event.target.code.value
        ServerIfCodeTrue(email, code)
            .then(r => {
                if (r) {
                    setCodes('password')
                }
                else {
                    //TODO הודעת שגיאה
                    console.log('wrong code');
                }
            })

    }

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
                alert('invalid email address')
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
            // if (!(/^[a-zA-Z]+$/.test(name))) {
            //     console.log('שם צריך להיות רק אותיות באנגלית');
            //     event.target.sname.value = '';
            // }
            /////pasword
            if (/^(?=.*[a-zA-Z])[a-zA-Z\d]{4,}$/.test(password)) {
            } else {
                event.target.spassword.value = '';
            }
            ///email
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                console.log("Valid email address");
            } else {
                alert('כתובת מייל שגויה')
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
                console.log(r.response.data, 'r');
                alert(r.response.data)
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
                    <Button className="register" type="button" onClick={() => setLogin(false)}>להרשמה</Button>
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

        {login ?

            <>
                <h4 onClick={forgotPassword}>שכחתי ססימא</h4>

                {forgot ?
                    <>
                        {codes == 'email' ?
                            <form onSubmit={codeInEmail}>
                                <label htmlFor="">הכנס מייל </label>
                                <input className="inputLogin " type="email" name="email" placeholder="username@domain.com" /><br />
                                <button >send code</button>
                            </form>
                            : 
                            <>
                            { codes == 'code' ?
                                <form onSubmit={ifCodesTrue}>
                                    <p>שלחנו למייל שלך קוד אימות  בן 6 ספרות נא הזן אותו </p>
                                    <input type="text" className="inputLogin" name="code" id="code" defaultValue={''} />
                                <button >verify code</button>
                                </form>
                                :
                                <form onSubmit={newPassword}>
                                   <p>בחר סיסמא חדשה: </p>
                                    <input type="password" className="inputLogin" name="pass" id="pass" defaultValue={''} />
                                    {/* //TODO אימות סיסמא */}
                                <button >verify code</button>
                                </form>
                        }
                        </>
                          
                        }
                    </>
                    :
                    <></>
                }
            </>
            :

            <></>
        }


    </>

}