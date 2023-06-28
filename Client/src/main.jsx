import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  BrowserRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import MyRouter from './Components/MyRouter.jsx'
import PotentialCustomer from './Components/PotentialCustomer/PotentialCustomer'
// import onmessage from './WorkerThreads/shopperThread.js'



let token = Cookies.get('token');



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <BrowserRouter>
      <MyRouter />
      {/* <PotentialCustomer/> */}
    </BrowserRouter>
  </React.StrictMode>,
)