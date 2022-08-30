import {Route, Routes} from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import PostsUser from "../pages/PostsUser";

export const GuestRouter = () => (
    <Routes>
        <Route path="/" element={<Home />} default/>
        <Route path="/posts/:userId/user" element={<PostsUser/>}/>
    </Routes>
)
