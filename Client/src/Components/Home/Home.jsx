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

<br />
        <div class="checkbox-wrapper-34" >
        <p >אני נמצא בחנות</p>
            <input class='tgl tgl-ios' id='toggle-34' type='checkbox' name="inStore"  na checked={inShop.active} onChange={LeaveShop} />
      <label class='tgl-btn' for='toggle-34'></label>
        </div>
        <h4 className='labelhome'>נשמח לראותך שוב</h4>


       





    </>
}