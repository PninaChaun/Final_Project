import Cookies from 'js-cookie'
import { Link, Outlet } from 'react-router-dom'
import Button from '@mui/material/Button';
import './Home.css'

export const Home = () => {

    const token = Cookies.get('token')
    if (token == undefined) {
        //TODO להעביר ל URL של לוגין
    }

    return <>
        <li className='li'> <Link to='shopper' className='link'>אני יקנה </Link></li>
        <li className='li'>  <Link to='customer' className='link'>להוסיף קניה</Link></li>
        <h4 className='labelhome'>נשמח לראותך שוב</h4>
        {/* <Outlet></Outlet> / */}

    </>
}