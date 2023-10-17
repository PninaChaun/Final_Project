import Cookies from 'js-cookie'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import './Home.css'
import { useEffect, useState } from 'react';
import { ServerGroups } from '../../api/serverInvites';
import { serverInShop, serverLeaveShop } from '../../api/serverShopper';
import Context from '../../context/context';

export const Home = ({ group, setGroup }) => {
    const _navigate = useNavigate(Context);

    const [inShop, setInShop] = useState({ active: false })

    useEffect(() => {
        ServerGroups()
            .then(r => JSON.parse(r))
            .then((r) => {
                setGroup([...group, ...r])
            })

        serverInShop()
            .then(r => JSON.parse(r))
            .then((r) => setInShop(r))
    }, [])

    const LeaveShop = () => {
        if (inShop.active) {
            serverLeaveShop()
            setInShop({ active: false })
        }

        else
            _navigate('/shopper')
    }


    const token = Cookies.get('token')
    if (token == undefined) {
        //TODO להעביר ל URL של לוגין
    }

    return <>
        <li className='li'> <Link to='shopper' className='link'>אני יקנה </Link></li>
        <li className='li'>  <Link to='customer' className='link'>להוסיף קניה</Link></li>
        {/* <p> HEllo {inShop.active} </p> */}
        {console.log(inShop, 'Home')}
        {console.log(inShop.active, 'active')}

        <div className='toggle-wrapper'>
            <div className='toggle.normal'>
                <input type="checkbox" name="" id="" />
            </div>
        </div>

        <input type="checkbox" name="inStore" id="inStore" checked={inShop.active} onChange={LeaveShop} />
        <h4 className='labelhome'>נשמח לראותך שוב</h4>
    </>
}