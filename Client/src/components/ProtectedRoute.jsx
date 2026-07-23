import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function ProtectedRoute() {

    const {
        isAuthenticated
    } = useAuth();


    // ========================================
    // USER IS NOT LOGGED IN
    // ========================================

    if (!isAuthenticated) {

        return (

            <Navigate
                to="/login"
                replace
            />

        );

    }


    // ========================================
    // USER IS LOGGED IN
    // ========================================

    return (

        <Outlet />

    );

}


export default ProtectedRoute;