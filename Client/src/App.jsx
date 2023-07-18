import React from "react";
import { useState, useContext } from "react";
import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Login/Login"
import Cookies from 'js-cookie'
import { Customer } from "./Components/Customer/Customer";
import PotentialCustomer from "./Components/PotentialCustomer/PotentialCustomer";
import PopupContext from "./context/context";
// 
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() { 
    return (
        <>
            <Home />
            <index/>
            {/* <PotentialCustomer /> */}
        </>

    )
}
export default App;