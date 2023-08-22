import React from "react";

import {Routes,Route} from "react-router-dom";
import Message from "../pages/message";
import LoginSignup from "../pages/login_signup";
import NotValidpage from "../pages/NotValidPage";

export default function AllRoute()
{
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginSignup/>}></Route>
                <Route path="/message" element={<Message/>}></Route>
                <Route path="*" element={<NotValidpage/>}></Route>
            </Routes>
        </div>
    )
}