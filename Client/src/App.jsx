import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";


// ========================================
// PAGES
// ========================================

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

import Workspace from "./pages/Workspace";

import Tasks from "./pages/Tasks";


// ========================================
// COMPONENTS
// ========================================

import ProtectedRoute from "./components/ProtectedRoute";

import AppLayout from "./components/AppLayout";


// ========================================
// APP
// ========================================

function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* ========================================
                    PUBLIC ROUTES
                ======================================== */}

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />


                <Route
                    path="/signup"
                    element={
                        <Signup />
                    }
                />


                {/* ========================================
                    PROTECTED ROUTES
                ======================================== */}

                <Route
                    element={
                        <ProtectedRoute />
                    }
                >


                    {/* ========================================
                        APPLICATION LAYOUT
                    ======================================== */}

                    <Route
                        element={
                            <AppLayout />
                        }
                    >


                        {/* ========================================
                            DASHBOARD
                        ======================================== */}

                        <Route
                            path="/dashboard"
                            element={
                                <Dashboard />
                            }
                        />


                        {/* ========================================
                            WORKSPACE
                        ======================================== */}

                        <Route
                            path="/workspace"
                            element={
                                <Workspace />
                            }
                        />


                        {/* ========================================
                            TASKS
                        ======================================== */}

                        <Route
                            path="/tasks"
                            element={
                                <Tasks />
                            }
                        />


                    </Route>


                </Route>


                {/* ========================================
                    DEFAULT ROUTE
                ======================================== */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />


            </Routes>

        </BrowserRouter>

    );

}


export default App;