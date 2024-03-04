import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import MyRouter from './Components/MyRouter.jsx'
import PotentialCustomer from './Components/PotentialCustomer/PotentialCustomer'
// import onmessage from './WorkerThreads/shopperThread.js'
import { PopupProvider } from 'react-hook-popup';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <>
      <Link to='/' ><img className="logo" src="src/assets/img/logo.png" width="150px" /></Link>
        <Link to='groups' className='menu-link'><GroupsIcon fontSize='small'/> קבוצות</Link>
      <Link to='settings' className='menu-link'><SettingsOutlinedIcon fontSize='small'/> הגדרות </Link> 
       <Link to='chat' className='menu-link'><ChatIcon fontSize='small'/> chat</Link>
        <Link to='orders' className='menu-link'><ShoppingBagOutlinedIcon fontSize='small'/> הזמנות </Link>
      {/* <Link to='/' ><img className="logo" src="src/assets/img/logo.png" width="150px" /></Link>
        <Link to='groups' className='menu-link'> קבוצות</Link>
      <Link to='settings' className='menu-link'>הגדרות<img  src="src/assets/img/settings.png" /></Link>
        <Link to='chat' className='menu-link'> chat</Link>
        <Link to='orders' className='menu-link'> הזמנות </Link> */}


      <PopupProvider>
      <MyRouter />
      </PopupProvider>
      {/* <PotentialCustomer/> */}
      </>
    </BrowserRouter>
  </React.StrictMode>,
)