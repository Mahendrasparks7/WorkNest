import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

import "./Dashboard.css";


function Dashboard() {

    const navigate =
        useNavigate();


    // ========================================
    // AUTH CONTEXT
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


    return (

        <div className="dashboard-page">


            {/* ========================================
                DASHBOARD HEADER
            ======================================== */}

            <header className="dashboard-header">


                {/* BRAND */}

                <div className="dashboard-brand">

                    <div className="dashboard-logo">

                        W

                    </div>


                    <h2>

                        WorkNest

                    </h2>

                </div>


                {/* USER SECTION */}

                <div className="dashboard-user-section">


                    {/* USER INFO */}

                    <div className="dashboard-user-info">

                        <span className="welcome-text">

                            Welcome,

                        </span>


                        <strong>

                            {user?.name}

                        </strong>

                    </div>


                    {/* USER AVATAR */}

                    <div className="dashboard-avatar">

                        {user?.name
                            ?.charAt(0)
                            ?.toUpperCase()
                        }

                    </div>


                    {/* LOGOUT */}

                    <button

                        className="dashboard-logout-button"

                        onClick={
                            handleLogout
                        }

                    >

                        Logout

                    </button>


                </div>


            </header>


            {/* ========================================
                MAIN DASHBOARD
            ======================================== */}

            <main className="dashboard-content">


                {/* ========================================
                    WELCOME SECTION
                ======================================== */}

                <section className="dashboard-welcome">

                    <h1>

                        Good to see you,{" "}

                        {user?.name}!

                    </h1>


                    <p>

                        Here's what's happening
                        with your work today.

                    </p>

                </section>


                {/* ========================================
                    STATISTICS
                ======================================== */}

                <section className="dashboard-stats">


                    {/* TOTAL TASKS */}

                    <div className="stat-card">

                        <div className="stat-icon">

                            ✓

                        </div>


                        <div className="stat-info">

                            <span>

                                Total Tasks

                            </span>


                            <strong>

                                0

                            </strong>

                        </div>

                    </div>


                    {/* COMPLETED TASKS */}

                    <div className="stat-card">

                        <div className="stat-icon">

                            ✓

                        </div>


                        <div className="stat-info">

                            <span>

                                Completed

                            </span>


                            <strong>

                                0

                            </strong>

                        </div>

                    </div>


                    {/* IN PROGRESS */}

                    <div className="stat-card">

                        <div className="stat-icon">

                            →

                        </div>


                        <div className="stat-info">

                            <span>

                                In Progress

                            </span>


                            <strong>

                                0

                            </strong>

                        </div>

                    </div>


                    {/* PROJECTS */}

                    <div className="stat-card">

                        <div className="stat-icon">

                            #

                        </div>


                        <div className="stat-info">

                            <span>

                                Projects

                            </span>


                            <strong>

                                0

                            </strong>

                        </div>

                    </div>


                </section>


                {/* ========================================
                    DASHBOARD GRID
                ======================================== */}

                <section className="dashboard-grid">


                    {/* ========================================
                        MY TASKS
                    ======================================== */}

                    <div className="dashboard-card">


                        <div className="card-header">

                            <h2>

                                My Tasks

                            </h2>


                            <button>

                                View All

                            </button>

                        </div>


                        <div className="empty-state">

                            <div className="empty-icon">

                                ✓

                            </div>


                            <h3>

                                No tasks yet

                            </h3>


                            <p>

                                Create your first task
                                to get started.

                            </p>


                            <button
                                className="primary-button"
                            >

                                Create Task

                            </button>

                        </div>


                    </div>


                    {/* ========================================
                        RECENT PROJECTS
                    ======================================== */}

                    <div className="dashboard-card">


                        <div className="card-header">

                            <h2>

                                Recent Projects

                            </h2>


                            <button>

                                View All

                            </button>

                        </div>


                        <div className="empty-state">

                            <div className="empty-icon">

                                +

                            </div>


                            <h3>

                                No projects yet

                            </h3>


                            <p>

                                Create a project
                                to organize your work.

                            </p>


                            <button
                                className="primary-button"
                            >

                                Create Project

                            </button>

                        </div>


                    </div>


                </section>


            </main>


        </div>

    );

}


export default Dashboard;