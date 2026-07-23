import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";

function Signup() {

    const navigate = useNavigate();


    // ================================
    // FORM DATA
    // ================================

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: "",

        confirmPassword: ""

    });


    // ================================
    // ERROR MESSAGE
    // ================================

    const [error, setError] = useState("");


    // ================================
    // HANDLE INPUT CHANGE
    // ================================

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


    // ================================
    // HANDLE SIGNUP
    // ================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        // Clear previous error
        setError("");


        // ================================
        // VALIDATE EMPTY FIELDS
        // ================================

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {

            setError(
                "Please fill in all fields."
            );

            return;

        }


        // ================================
        // VALIDATE PASSWORD MATCH
        // ================================

        if (
            formData.password !==
            formData.confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;

        }


        // ================================
        // VALIDATE PASSWORD LENGTH
        // ================================

        if (
            formData.password.length < 6
        ) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;

        }


        // ================================
        // SEND DATA TO BACKEND
        // ================================

        try {

            const response =
                await api.post(

                    "/auth/signup",

                    {

                        name:
                            formData.name,

                        email:
                            formData.email,

                        password:
                            formData.password

                    }

                );


            // ================================
            // SUCCESS
            // ================================

            console.log(
                "Signup successful:",
                response.data
            );


            // Redirect to Login
            navigate(
                "/login"
            );


        } catch (error) {

            // ================================
            // ERROR
            // ================================

            console.error(
                "Signup failed:",
                error
            );


            if (
                error.response
            ) {

                setError(

                    error.response.data.message

                );

            } else {

                setError(

                    "Unable to connect to the server."

                );

            }

        }

    };


    return (

        <div className="auth-page">

            <div className="auth-container">


                {/* ================================
                    LEFT SIDE - BRANDING
                ================================= */}

                <div className="auth-brand">

                    <div className="brand-logo">

                        T

                    </div>


                    <h1>

                        Build better work with TaskFlow

                    </h1>


                    <p>

                        Create your workspace,
                        organize projects,
                        and keep your entire
                        team aligned.

                    </p>

                </div>


                {/* ================================
                    RIGHT SIDE - SIGNUP FORM
                ================================= */}

                <div className="auth-form-container">

                    <div className="auth-form">


                        {/* ================================
                            HEADER
                        ================================= */}

                        <h2>

                            Create an Account

                        </h2>


                        <p className="auth-subtitle">

                            Start managing your projects today

                        </p>


                        {/* ================================
                            ERROR MESSAGE
                        ================================= */}

                        {error && (

                            <div className="error-message">

                                {error}

                            </div>

                        )}


                        {/* ================================
                            SIGNUP FORM
                        ================================= */}

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >


                            {/* ================================
                                NAME
                            ================================= */}

                            <div className="form-group">

                                <label htmlFor="name">

                                    Full Name

                                </label>


                                <input

                                    type="text"

                                    id="name"

                                    name="name"

                                    placeholder="Enter your full name"

                                    value={
                                        formData.name
                                    }

                                    onChange={
                                        handleChange
                                    }

                                />

                            </div>


                            {/* ================================
                                EMAIL
                            ================================= */}

                            <div className="form-group">

                                <label htmlFor="email">

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

                                />

                            </div>


                            {/* ================================
                                PASSWORD
                            ================================= */}

                            <div className="form-group">

                                <label htmlFor="password">

                                    Password

                                </label>


                                <input

                                    type="password"

                                    id="password"

                                    name="password"

                                    placeholder="Create a password"

                                    value={
                                        formData.password
                                    }

                                    onChange={
                                        handleChange
                                    }

                                />

                            </div>


                            {/* ================================
                                CONFIRM PASSWORD
                            ================================= */}

                            <div className="form-group">

                                <label htmlFor="confirmPassword">

                                    Confirm Password

                                </label>


                                <input

                                    type="password"

                                    id="confirmPassword"

                                    name="confirmPassword"

                                    placeholder="Confirm your password"

                                    value={
                                        formData.confirmPassword
                                    }

                                    onChange={
                                        handleChange
                                    }

                                />

                            </div>


                            {/* ================================
                                SIGNUP BUTTON
                            ================================= */}

                            <button

                                type="submit"

                                className="auth-button"

                            >

                                Create Account

                            </button>


                        </form>


                        {/* ================================
                            DIVIDER
                        ================================= */}

                        <div className="auth-divider">

                            <span>

                                OR

                            </span>

                        </div>


                        {/* ================================
                            LOGIN LINK
                        ================================= */}

                        <p className="auth-switch">

                            Already have an account?

                            {" "}

                            <Link to="/login">

                                Sign in

                            </Link>

                        </p>


                    </div>

                </div>

            </div>

        </div>

    );

}


export default Signup;