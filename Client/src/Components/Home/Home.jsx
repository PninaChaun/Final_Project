import Cookies from 'js-cookie'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import './Home.css'
import { useEffect, useState } from 'react';
import { ServerGroups } from '../../api/serverInvites';
import { serverInShop, serverLeaveShop } from '../../api/serverShopper';
import Context from '../../context/context';
import { Grid, Switch, createTheme } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

export const Home = ({ group, setGroup }) => {
    const _navigate = useNavigate(Context);

    const [inShop, setInShop] = useState({ active: false })

    let theme = createTheme({
        palette: {
            primary: {
                main: '#FF8F45',
                contrastText: 'white'
            },
            secondary: {
                main: '#19acb7'
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
        _navigate('/login')
    }

    return <> <Grid container spacing={1}>
        <Grid item >
            <Button variant='contained' theme={theme} className='whiteLetters' onClick={() => _navigate('/shopper')}>אני הולך לחנות</Button>
        </Grid>
        <Grid item>
            <Button variant='contained' theme={theme} className='whiteLetters' onClick={() => _navigate('/customer')}>הזמנת מוצר</Button>
        </Grid>
    </Grid>
        <FormControlLabel
            control={
                <Switch theme={theme} checked={inShop.active} onChange={LeaveShop} inputProps={{ 'aria-label': 'controlled' }}></Switch>
            }
            label="אני נמצא בחנות" />
        <h4 className='labelhome'>נשמח לראותך שוב</h4>

    </>
}