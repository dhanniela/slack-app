import React, { useState, useEffect } from "react";
import { Sidebar } from "./sidebar/Sidebar";
import { Outlet } from "react-router";

export function DashboardWrapper() {
  return (
    <div className="content">
        <Sidebar />
        <div className="content-container">
            <Outlet />
        </div>
    </div>
  );
}