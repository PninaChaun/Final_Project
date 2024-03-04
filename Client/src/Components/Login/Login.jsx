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
import { TextField, createTheme } from "@mui/material";

export const Login = () => {
    const [login, setLogin] = useState(true);
    const _navigate = useNavigate(Context);
    const expireIn = 5 * 60 * 60 * 1000; //5 hours
    const [forgot, setForgot] = useState(false);
    const [codes, setCodes] = useState('email');
    const [email, setEmail] = useState('');
    const [alert] = useAlert()

    let theme = createTheme({
        palette: {
            primary: {
                main: '#0e7f87',
            }
        },
    });


    const forgotPassword = () => {
        setForgot(!forgot)
    }

    const codeInEmail = ($event) => {
        event.preventDefault()
        setEmail(event.target.email.value)
        setCodes('code')
        ServerForgotPassword(event.target.email.value)

    }

    const newPassword = () => {
        event.preventDefault()
        let pass = event.target.pass.value
        let pass2 = event.target.pass2.value
        // console.log(pass);
        // console.log(pass2);
        if (pass != pass2) {
            alert('אימות סיסמא לא תואם לסיסמא, נסה שוב')
            event.target.pass = ''
            event.target.pass2 = ''
            return
        }
        ServerResetPassword(email, pass)
            .then(r => JSON.parse(r))
            .then(r => {
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
                    alert('wrong code')
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
            } else {
                event.target.lpassword.value = '';
            }

            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
            /////pasword
            if (/^(?=.*[a-zA-Z])[a-zA-Z\d]{4,}$/.test(password)) {
            } else {
                event.target.spassword.value = '';
            }
            ///email
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

                    <Button variant="outlined" className="register" type="button" theme={theme} onClick={() => setLogin(false)}>להרשמה</Button>

                    <br />
                    <TextField variant="standard" className="inputLogin " type="email" name="lemail" label="הכנס מייל" />
                    <br />
                    <TextField variant="standard" className="inputLogin " type="password" name="lpassword" id="lpassword" label="הכנס סיסמא" />

                </>
                :
                <>

                    <Button type="button" variant="outlined" theme={theme} onClick={() => setLogin(true)}>להתחברות</Button>

                    <TextField variant="outlined" className="inputLogin " type="email" name="semail" label="הכנס כתובת מייל" />
                    <TextField variant="outlined" className="inputLogin " type="password" name="spassword" id="spassword" label="הכנס סיסמא" />
                    <TextField variant="outlined" className="inputLogin " type="password" name="spassword2" id="spassword2" label="אימות סיסמא" />
                    <TextField variant="outlined" className="inputLogin " type="text" name="sname" id="sname" label="הכנס שם" />
                    <TextField variant="outlined" className="inputLogin " type="number" name="saveOrder" id="saveOrder" min={1} label="משך זמן בשעות שמירת הזמנה" />
                    <TextField variant="outlined" className="inputLogin " type="number" name="saveStore" id="saveStore" min={1} label="משך זמן בשעות שמירת הליכה לחנות" />
                    <TextField variant="outlined" className="inputLogin " type="text" name="address" id="address" label="כתובת " />
                </>
            }
            <br />
            <button className="submitLogin" variant="text" theme={theme} type="submit">אישור</button>
        </form>

        {login ?

            <>
                <h4 style={{ cursor: 'pointer' }} onClick={forgotPassword}>שכחתי ססימא</h4>

                {forgot ?
                    <>
                        {codes == 'email' ?
                            <form onSubmit={codeInEmail}>
                                <TextField variant="standard" className="inputLogin " type="email" name="email" label="הכנס מייל" /><br />
                                <Button variant="text" theme={theme} type="submit" >send code</Button>
                            </form>
                            :
                            <>
                                {codes == 'code' ?
                                    <form onSubmit={ifCodesTrue}>
                                        <p>שלחנו למייל שלך קוד אימות  בן 6 ספרות נא הזן אותו </p>
                                        <TextField variant="standard" type="text" className="inputLogin" name="code" id="code" defaultValue={''} />
                                        <button variant="text" theme={theme} >אימות  הקוד</button>
                                    </form>
                                    :
                                    <form onSubmit={newPassword}>
                                        <p>בחר סיסמא חדשה: </p>
                                        <TextField variant="standard" type="password" className="inputLogin" name="pass" id="pass" defaultValue={''} />
                                        <label htmlFor="pass2">אימות סיסמא</label>
                                        <TextField variant="standard" type="password" className="inputLogin" name="pass2" id="pass2" defaultValue={''} />
                                        <button variant="text" theme={theme}>אישור </button>
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