import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DMSidebar } from "./DMSidebar";
import { DashboardWrapper } from "./DashboardWrapper.jsx";
import { ChannelSidebar } from "./ChannelSidebar";
import { HomeSidebar } from "./HomeSidebar.jsx";

export const Dashboard = (
    <Route path="/" element={<DashboardWrapper />}>
        <Route path="/sidedm" element={<DMSidebar/>}/>
        <Route path="/sidechannels" element={<ChannelSidebar/>}/>
        <Route path="/home" element={<HomeSidebar/>}/>
    </Route>
);