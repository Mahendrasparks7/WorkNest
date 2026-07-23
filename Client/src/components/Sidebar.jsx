import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../context/AuthContext";

import "./Sidebar.css";


function Sidebar() {

    const navigate =
        useNavigate();

    const location =
        useLocation();


    // ========================================
    // GET USER AND LOGOUT
    // ========================================

    const {
        user,
        logout
    } = useAuth();


    // ========================================
    // HANDLE LOGOUT
    // ========================================

    const handleLogout = () => {

        logout();

        navigate(
            "/login"
        );

    };


    // ========================================
    // CHECK ACTIVE LINK
    // ========================================

    const isActive =
        (path) => {

            return location.pathname === path;

        };


    return (

        <aside className="sidebar">


            {/* ========================================
                BRAND
            ======================================== */}

            <div className="sidebar-brand">

                <div className="sidebar-logo">

                    W

                </div>


                <h2>

                    WorkNest

                </h2>

            </div>


            {/* ========================================
                USER PROFILE
            ======================================== */}

            <div className="sidebar-user">

                <div className="user-avatar">

                    {user?.name
                        ?.charAt(0)
                        ?.toUpperCase()
                    }

                </div>


                <div className="user-info">

                    <strong>

                        {user?.name ||
                            "User"
                        }

                    </strong>


                    <span>

                        {user?.email ||
                            "user@example.com"
                        }

                    </span>

                </div>

            </div>


            {/* ========================================
                MAIN NAVIGATION
            ======================================== */}

            <nav className="sidebar-navigation">


                {/* ========================================
                    HOME / DASHBOARD
                ======================================== */}

                <Link
                    to="/dashboard"
                    className={

                        `sidebar-link ${
                            isActive(
                                "/dashboard"
                            )
                                ? "active"
                                : ""
                        }`

                    }
                >

                    <span>

                        🏠

                    </span>

                    Home

                </Link>


                {/* ========================================
                    WORKSPACE SECTION
                ======================================== */}

                <div className="sidebar-section">


                    <div className="sidebar-section-title">

                        WORKSPACE

                    </div>


                    {/* MY WORKSPACE */}

                    <Link
                        to="/workspace"
                        className={

                            `sidebar-link ${
                                isActive(
                                    "/workspace"
                                )
                                    ? "active"
                                    : ""
                            }`

                        }
                    >

                        <span>

                            📁

                        </span>

                        My Workspace

                    </Link>


                    {/* ========================================
                        MY TASKS
                    ======================================== */}

                    <Link
                        to="/tasks"
                        className={

                            `sidebar-link ${
                                isActive(
                                    "/tasks"
                                )
                                    ? "active"
                                    : ""
                            }`

                        }
                    >

                        <span>

                            ✅

                        </span>

                        My Tasks

                    </Link>


                </div>


                {/* ========================================
                    QUICK ACCESS
                ======================================== */}

                <div className="sidebar-section">


                    <div className="sidebar-section-title">

                        QUICK ACCESS

                    </div>


                    {/* ALL TASKS */}

                    <Link
                        to="/tasks"
                        className={

                            `sidebar-link ${
                                isActive(
                                    "/tasks"
                                )
                                    ? "active"
                                    : ""
                            }`

                        }
                    >

                        <span>

                            📋

                        </span>

                        Task Board

                    </Link>


                </div>


            </nav>


            {/* ========================================
                BOTTOM SECTION
            ======================================== */}

            <div className="sidebar-bottom">


                {/* ========================================
                    SETTINGS
                ======================================== */}

                <button
                    className="sidebar-link sidebar-button"
                    onClick={() => {

                        alert(
                            "Settings will be available soon."
                        );

                    }}
                >

                    <span>

                        ⚙️

                    </span>

                    Settings

                </button>


                {/* ========================================
                    LOGOUT
                ======================================== */}

                <button
                    className="logout-button"
                    onClick={
                        handleLogout
                    }
                >

                    <span>

                        🚪

                    </span>

                    Logout

                </button>


            </div>


        </aside>

    );

}


export default Sidebar;