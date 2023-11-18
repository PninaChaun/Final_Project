import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import MyRouter from './Components/MyRouter.jsx'
import PotentialCustomer from './Components/PotentialCustomer/PotentialCustomer'
// import onmessage from './WorkerThreads/shopperThread.js'
import { PopupProvider } from 'react-hook-popup';


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <>
      <Link to='/' ><img className="logo" src="src/assets/img/logo.png" width="150px" /></Link>
        <Link to='groups' className='menu-link'> קבוצות</Link>
      <Link to='settings' ><img  src="src/assets/img/settings.png" /></Link>
        <Link to='chat' className='menu-link'> chat</Link>
        <Link to='orders' className='menu-link'> הזמנות </Link>


      <PopupProvider>
      <MyRouter />
      </PopupProvider>
      {/* <PotentialCustomer/> */}
      </>
    </BrowserRouter>
  </React.StrictMode>,
)