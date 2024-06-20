import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

    if (currentUser) {
        return <Outlet/>
    }
    else{
        return <Navigate to="/login" />;
    }
};