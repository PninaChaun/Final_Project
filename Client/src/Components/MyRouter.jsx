import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Customer } from "./Customer/Customer";
import { Shopper } from './Shopper/Shopper'
import { Login } from "./Login/Login";
import Cookies from "js-cookie";
import axios from "axios";
import { Chat } from "./Chat/Chat";
import { Settings } from "./Settings/Settings";
import { Context } from '../context/context'
import { PotentialCustomer } from "./PotentialCustomer/PotentialCustomer";
import App from "../App";
import { PotentialShopper } from "./PotentialShopper/PotentialShopper";
import { Admin } from "./Admin/Admin";
import { Groups } from "./Groups/Groups";
import { Home } from "./Home/Home";
import { JoinGroup } from "../JoinGroup/JoinGroup";

const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('token')
    if (!token) {
        // let path = location.href
        // Cookies.set('initial_path', path)
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default function MyRouter() {
    let navigate = useNavigate();
    const [order, setOrder] = useState([]);
    const [shopper, setShopper] = useState(null);
    const [shopId, setshopId] = useState(null);
    const [group, setGroup] = useState([]);



    return (
        <div>
            <Context.Provider value={navigate}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="*"
                        element={
                            <ProtectedRoute>
                                <Routes>
                                    <Route path="/" element={<Home  group={group} setGroup={setGroup} />} />
                                    <Route path="/shopper" element={<Shopper order={order} setOrder={setOrder} shopId={shopId} setshopId={setshopId} />} />
                                    <Route path="/customer" element={<Customer setShopper={setShopper} />} />
                                    {/* <Route path="/chat" element={<Chat />} /> */}
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/popup" element={<PotentialCustomer />} />
                                    <Route path="/admin" element={<Admin />} />
                                    {/* <Route path="/PotentialShopper" element={<PotentialShopper />} />
                                    <Route path="/PotentialShopper" element={<PotentialShopper />} /> */}
                                    <Route path="/groups" element={<Groups />} />
        
                                </Routes>
                            </ProtectedRoute>
                        }
                    />

                </Routes>
            </Context.Provider>

            <PotentialCustomer order={order} setOrder={setOrder} shopId={shopId} />
            <PotentialShopper shopper={shopper} setShopper={setShopper} />
            <JoinGroup group={group} setGroup={setGroup} />
        </div>
    );
}