import Cookies from 'js-cookie'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import './Home.css'
import { useEffect, useState } from 'react';
import { ServerGroups } from '../../api/serverInvites';
import { serverInShop, serverLeaveShop } from '../../api/serverShopper';
import Context from '../../context/context';
import { createTheme } from '@mui/material';

export const Home = ({ group, setGroup }) => {
    const _navigate = useNavigate(Context);

    const [inShop, setInShop] = useState({ active: false })

    let theme = createTheme({
        palette: {
            primary: {
                main: '#FF8F45',
            },
            secondary: {
                main: '#FF0000'
            },
        },
    });

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
        <Button variant='contained' theme={theme} onClick={() => _navigate('/shopper')} sx={{
            width: '35%',
            color: 'white',
            margin: '2px'
        }}>אני הולך לחנות</Button>

        <Button variant='contained' theme={theme} onClick={() => _navigate('/customer')} sx={{
            width: '35%',
            color: 'white',
            margin: '2px'
        }}>הזמנת מוצר</Button>
        <br />
        <div className="checkbox-wrapper-34" >
            <p >אני נמצא בחנות</p>
            <input className='tgl tgl-ios' id='toggle-34' type='checkbox' name="inStore" checked={inShop.active} onChange={LeaveShop} />
            <label className='tgl-btn' htmlFor='toggle-34'></label>
        </div>
        <h4 className='labelhome'>נשמח לראותך שוב</h4>








    </>
}