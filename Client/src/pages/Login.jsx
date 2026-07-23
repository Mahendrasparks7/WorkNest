import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

import "./Login.css";


function Login() {

    const navigate = useNavigate();

    // Get login function from AuthContext
    const { login } = useAuth();


    // ========================================
    // FORM DATA
    // ========================================

    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });


    // ========================================
    // ERROR MESSAGE
    // ========================================

    const [error, setError] = useState("");


    // ========================================
    // HANDLE INPUT CHANGE
    // ========================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData(
            (previousData) => ({

                ...previousData,

                [name]: value

            })
        );

    };


    // ========================================
    // HANDLE LOGIN
    // ========================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        // Clear previous error
        setError("");


        // ========================================
        // VALIDATE FORM
        // ========================================

        if (
            !formData.email ||
            !formData.password
        ) {

            setError(
                "Please enter your email and password."
            );

            return;

        }


        // ========================================
        // SEND LOGIN REQUEST TO BACKEND
        // ========================================

        try {

            const response = await api.post(

                "/auth/login",

                {

                    email:
                        formData.email,

                    password:
                        formData.password

                }

            );


            // ========================================
            // LOGIN SUCCESS
            // ========================================

            console.log(
                "Login successful:",
                response.data
            );


            // ========================================
            // SAVE USER IN AUTH CONTEXT
            // ========================================

            login(
                response.data.user
            );


            // ========================================
            // NAVIGATE TO DASHBOARD
            // ========================================

            navigate(
                "/dashboard"
            );


        } catch (error) {

            // ========================================
            // LOGIN FAILED
            // ========================================

            console.error(
                "Login failed:",
                error
            );


            // Backend returned an error
            if (
                error.response
            ) {

                setError(

                    error.response.data.message

                );

            } else {

                // Backend is not reachable
                setError(

                    "Unable to connect to the server."

                );

            }

        }

    };


    return (

        <div className="login-page">


            {/* ========================================
                LEFT SIDE - BRANDING
            ======================================== */}

            <div className="login-brand-section">

                <div className="brand-content">


                    {/* LOGO */}

                    <div className="brand-logo">

                        <span>

                            W

                        </span>

                    </div>


                    {/* TITLE */}

                    <h1>

                        Welcome back to WorkNest

                    </h1>


                    {/* DESCRIPTION */}

                    <p>

                        Organize your work,
                        manage your projects,
                        and collaborate
                        with your team
                        in one place.

                    </p>


                </div>

            </div>


            {/* ========================================
                RIGHT SIDE - LOGIN FORM
            ======================================== */}

            <div className="login-form-section">

                <div className="login-card">


                    {/* ========================================
                        HEADER
                    ======================================== */}

                    <div className="login-header">

                        <h2>

                            Welcome Back

                        </h2>


                        <p>

                            Sign in to continue
                            to WorkNest

                        </p>

                    </div>


                    {/* ========================================
                        ERROR MESSAGE
                    ======================================== */}

                    {error && (

                        <div className="error-message">

                            {error}

                        </div>

                    )}


                    {/* ========================================
                        LOGIN FORM
                    ======================================== */}

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >


                        {/* ========================================
                            EMAIL
                        ======================================== */}

                        <div className="form-group">

                            <label
                                htmlFor="email"
                            >

                                Email Address

                            </label>


                            <input

                                type="email"

                                id="email"

                                name="email"

                                placeholder="Enter your email"

                                value={
                                    formData.email
                                }

                                onChange={
                                    handleChange
                                }

                                required

                            />

                        </div>


                        {/* ========================================
                            PASSWORD
                        ======================================== */}

                        <div className="form-group">

                            <div className="password-label">

                                <label
                                    htmlFor="password"
                                >

                                    Password

                                </label>


                                <Link
                                    to="/forgot-password"
                                >

                                    Forgot password?

                                </Link>

                            </div>


                            <input

                                type="password"

                                id="password"

                                name="password"

                                placeholder="Enter your password"

                                value={
                                    formData.password
                                }

                                onChange={
                                    handleChange
                                }

                                required

                            />

                        </div>


                        {/* ========================================
                            LOGIN BUTTON
                        ======================================== */}

                        <button

                            type="submit"

                            className="login-button"

                        >

                            Sign In

                        </button>


                    </form>


                    {/* ========================================
                        DIVIDER
                    ======================================== */}

                    <div className="divider">

                        <span></span>

                        <p>

                            OR

                        </p>

                        <span></span>

                    </div>


                    {/* ========================================
                        SIGNUP LINK
                    ======================================== */}

                    <div className="signup-link">

                        <p>

                            Don't have an account?

                            {" "}

                            <Link
                                to="/signup"
                            >

                                Create an account

                            </Link>

                        </p>

                    </div>


                </div>

            </div>


        </div>

    );

}


export default Login;