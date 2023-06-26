import React from "react";
import { useState, useContext } from "react";
import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Login/Login"
import Cookies from 'js-cookie'
import { Customer } from "./Components/Customer/Customer";
import PotentialCustomer from "./Components/PotentialCustomer/PotentialCustomer";
import PopupContext from "./context/context";

function App() {

    return (
        <>
            <Home />
            {/* <PotentialCustomer /> */}
        </>

    )
}

export default App;