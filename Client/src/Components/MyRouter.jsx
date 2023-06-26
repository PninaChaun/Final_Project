import React, { useState } from "react";
import {  Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Customer } from "./Customer/Customer";
import { Shopper } from './Shopper/Shopper'
import { Login } from "./Login/Login";
import Cookies from "js-cookie";
import axios from "axios";
import { Chat } from "./Chat/Chat";
import { Settings } from "./Settings/Settings";
import {Context, PopupContext} from '../context/context'
import { PotentialCustomer } from "./PotentialCustomer/PotentialCustomer";
import App from "../App";

const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('token')
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    // axios.defaults.headers.common['Authorization'] = token;
    return children;
};

export default function MyRouter() {
    let navigate =useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    // console.log('my router re', showPopup  );
    return (
        <div>
            
    <Context.Provider  value = {navigate}>
         <PopupContext.Provider  value = {[showPopup, setShowPopup]}>
            <Routes>
                
                <Route path="/login" element={<Login />} />
                <Route
                    path="*"
                    element={
                        <ProtectedRoute>
                            <Routes>
                                <Route path="/" element={<App />} />
                                <Route path="/shopper" element={<Shopper />} />
                                <Route path="/customer" element={<Customer />} />
                                <Route path="/chat" element={<Chat />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/popup" element={<PotentialCustomer />} />

                            </Routes>
                        </ProtectedRoute>
                    }
                />
               
            </Routes>
            </PopupContext.Provider>

            </Context.Provider>
        </div>
    );
}