import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import MyRouter from './Components/MyRouter.jsx'
import PotentialCustomer from './Components/PotentialCustomer/PotentialCustomer'
// import onmessage from './WorkerThreads/shopperThread.js'



let token = Cookies.get('token');



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <>
      <Link to='/' ><img className="logo" src="src/assets/img/logo.png" width="150px" /></Link>
        <Link to='groups' className='menu-link'> קבוצות</Link>
        <Link to='settings' className='menu-link'> הגדרות</Link>
      

      <MyRouter />
      {/* <PotentialCustomer/> */}
      </>
    </BrowserRouter>
  </React.StrictMode>,
)