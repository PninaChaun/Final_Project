import Cookies from 'js-cookie'
import { Link, Outlet } from 'react-router-dom'
import Button from '@mui/material/Button';
import './Home.css'
import { useEffect } from 'react';
import { ServerGroups } from '../../api/serverInvites';

export const Home = ({ group, setGroup }) => {

    useEffect(() => {
        ServerGroups()
            .then(r => JSON.parse(r))
            .then((r) => {
                setGroup([...group, ...r])
            })
    }, [])

    // const toggleButton = document.getElementById("toggle-button");

    // toggleButton.addEventListener("click", function () {
    //     toggleButton.classList.toggle("on"); toggleButton.classList.toggle("off");

    //     if (toggleButton.classList.contains("on")) { toggleButton.textContent = "דלוק"; } else { toggleButton.textContent = "כיבוי"; }
    // });
    const changeStore = () => {

    }


    const token = Cookies.get('token')
    if (token == undefined) {
        //TODO להעביר ל URL של לוגין
    }

    return <>
        <li className='li'> <Link to='shopper' className='link'>אני יקנה </Link></li>
        <li className='li'>  <Link to='customer' className='link'>להוסיף קניה</Link></li>
        {/* <li><input type="checkbox" name="1" id="" onClickCapture={changeStore} /> אני בחנות</li> */}
        <div class=".mt-android">
            <input id="1" type="checkbox" />
            <label for="1"></label>
        </div>

        <h4 className='labelhome'>נשמח לראותך שוב</h4>
    </>
}