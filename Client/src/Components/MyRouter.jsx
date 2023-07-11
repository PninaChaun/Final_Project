import React, { useState } from "react";
import {  Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Customer } from "./Customer/Customer";
import { Shopper } from './Shopper/Shopper'
import { Login } from "./Login/Login";
import Cookies from "js-cookie";
import axios from "axios";
import { Chat } from "./Chat/Chat";
import { Settings } from "./Settings/Settings";
import {Context} from '../context/context'
import { PotentialCustomer } from "./PotentialCustomer/PotentialCustomer";
import App from "../App";
import { PotentialShopper } from "./PotentialShopper/PotentialShopper";

const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('token')
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default function MyRouter() {
    let navigate =useNavigate();
    const [order, setOrder] = useState([]);
    const [shopper, setShopper] = useState(null);

    return (
        <div>
    <Context.Provider  value = {navigate}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="*"
                    element={
                        <ProtectedRoute>
                            <Routes>
                                <Route path="/" element={<App />} />
                                <Route path="/shopper" element={<Shopper order = {order} setOrder ={setOrder}/>} />
                                <Route path="/customer" element={<Customer setShopper={setShopper}  />} />
                                {/* <Route path="/chat" element={<Chat />} /> */}
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/popup" element={<PotentialCustomer />} />
                            </Routes>
                        </ProtectedRoute>
                    }
                />
               
            </Routes>
            </Context.Provider>

            <PotentialCustomer order ={order} setOrder={setOrder}/>
            <PotentialShopper shopper={shopper} setShopper={setShopper} />
        </div>
    );
}