import {Route, Routes} from "react-router-dom";
import React from "react";
import Home from "../pages/Home";

export const GuestRouter = () => (
    <Routes>
        <Route path="/" element={<Home />} default/>
    </Routes>
)
