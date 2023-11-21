import React, { useEffect, useState } from "react";
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
import { Groups } from "./Groups/Groups";
import { Home } from "./Home/Home";
import { JoinGroup } from "./JoinGroup/JoinGroup";
import { FindCustomer } from "../api/serverFindCustomer";
import { FindShopper } from "../api/serverFindShopper";
import { Chats } from "./Chats/Chats";
import { MyOrders } from "./MyOrders/MyOrders";



const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('token')
    if (!token) {
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
    const [orderId, setOrderId] = useState(null)
    const [showChat, setShowChat] = useState(-1)
    const [chatId, setChatId] = useState(null)

    //shopper looking for orders
    useEffect(() => {
        const interval = setInterval(() => {
            console.log(shopId, 'shopid');
            if (shopId != null) {
                if (order.length == 0) {
                    FindCustomer(shopId)
                        .then((r) => JSON.parse(r))
                        .then((r) => {
                            console.log(r, "r");
                            let col = r["col"];
                            setOrder(col);
                        });
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [shopId, order]);

    //customer looking for shopper
    useEffect(() => {
        let intervalId = setInterval(() => {
            if (orderId != null) {
                console.log(orderId, 'if');

                FindShopper(orderId)
                    .then(r => JSON.parse(r))
                    .then(r => {
                        if (Object.keys(r).length > 0) {
                            setShopper(r);
                            clearInterval(intervalId);
                        }
                    });
            }
        }, 5000);
    }, [orderId]);

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
                                    <Route path="/" element={<Home group={group} setGroup={setGroup} />} />
                                    <Route path="/shopper" element={<Shopper order={order} setOrder={setOrder} shopId={shopId} setshopId={setshopId} />} />
                                    <Route path="/customer" element={<Customer setOrderId={setOrderId} />} />
                                    <Route path="/chat" element={<Chats showChat={showChat} setShowChat={setShowChat} />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/orders" element={<MyOrders />} />
                                    <Route path="/groups" element={<Groups />} />
                                </Routes>
                            </ProtectedRoute>
                        }
                    />

                </Routes>
            </Context.Provider>

            <PotentialCustomer order={order} setOrder={setOrder} shopId={shopId} setChatId={setChatId} setShowChat={setShowChat} />
            <PotentialShopper shopper={shopper} setShopper={setShopper} setChatId={setChatId} orderId={orderId} setShowChat={setShowChat} />
            <JoinGroup group={group} setGroup={setGroup} />
        </div>
    );
}