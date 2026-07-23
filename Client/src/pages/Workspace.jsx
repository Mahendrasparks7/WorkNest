import {
    useEffect,
    useState
} from "react";

import {
    useAuth
} from "../context/AuthContext";

import {
    useNavigate
} from "react-router-dom";

import api from "../api/axios";

import "./Workspace.css";


function Workspace() {

    const {
        user
    } = useAuth();


    const navigate =
        useNavigate();


    // ========================================
    // WORKSPACES
    // ========================================

    const [
        workspaces,
        setWorkspaces
    ] = useState([]);


    // ========================================
    // FORM
    // ========================================

    const [
        name,
        setName
    ] = useState("");


    const [
        description,
        setDescription
    ] = useState("");


    // ========================================
    // ERROR
    // ========================================

    const [
        error,
        setError
    ] = useState("");


    // ========================================
    // LOADING
    // ========================================

    const [
        loading,
        setLoading
    ] = useState(true);


    // ========================================
    // LOAD WORKSPACES
    // ========================================

    const loadWorkspaces =
        async () => {

            if (!user?.id) {

                return;

            }


            try {

                setLoading(true);


                const response =
                    await api.get(

                        `/workspaces/user/${user.id}`

                    );


                setWorkspaces(

                    response.data.workspaces || []

                );


            } catch (error) {

                console.error(

                    "Error loading workspaces:",

                    error

                );


                setError(

                    error.response
                        ?.data
                        ?.message ||

                    "Unable to load workspaces."

                );


            } finally {

                setLoading(false);

            }

        };


    // ========================================
    // LOAD ON PAGE OPEN
    // ========================================

    useEffect(() => {

        if (user) {

            loadWorkspaces();

        }

    }, [user]);


    // ========================================
    // CREATE WORKSPACE
    // ========================================

    const handleCreateWorkspace =
        async (event) => {

            event.preventDefault();


            setError("");


            // ========================================
            // VALIDATE
            // ========================================

            if (!name.trim()) {

                setError(

                    "Workspace name is required."

                );

                return;

            }


            if (!user?.id) {

                setError(

                    "User information not available."

                );

                return;

            }


            // ========================================
            // CREATE
            // ========================================

            try {

                const response =
                    await api.post(

                        "/workspaces",

                        {

                            name:
                                name.trim(),

                            description:
                                description.trim(),

                            ownerId:
                                user.id

                        }

                    );


                const newWorkspace =
                    response.data.workspace;


                // ========================================
                // ADD TO UI
                // ========================================

                setWorkspaces(

                    (previousWorkspaces) => [

                        ...previousWorkspaces,

                        newWorkspace

                    ]

                );


                // ========================================
                // AUTOMATICALLY SELECT NEW WORKSPACE
                // ========================================

                localStorage.setItem(

                    "workspaceId",

                    newWorkspace.id

                );


                // ========================================
                // CLEAR FORM
                // ========================================

                setName("");

                setDescription("");


            } catch (error) {

                console.error(

                    "Create workspace error:",

                    error

                );


                setError(

                    error.response
                        ?.data
                        ?.message ||

                    "Unable to create workspace."

                );

            }

        };


    // ========================================
    // SELECT WORKSPACE
    // ========================================

    const handleSelectWorkspace =
        (workspace) => {

            // Save selected workspace ID

            localStorage.setItem(

                "workspaceId",

                workspace.id

            );


            // Navigate to Tasks

            navigate(

                "/tasks"

            );

        };


    // ========================================
    // RENDER
    // ========================================

    return (

        <div className="workspace-page">


            {/* ========================================
                HEADER
            ======================================== */}

            <div className="workspace-header">

                <div>

                    <h1>

                        My Workspace

                    </h1>


                    <p>

                        Create and manage
                        your workspaces.

                    </p>

                </div>

            </div>


            {/* ========================================
                CREATE WORKSPACE
            ======================================== */}

            <div className="workspace-create-card">

                <h2>

                    Create New Workspace

                </h2>


                <form
                    onSubmit={
                        handleCreateWorkspace
                    }
                >


                    {/* NAME */}

                    <div className="form-group">

                        <label>

                            Workspace Name

                        </label>


                        <input

                            type="text"

                            placeholder="Enter workspace name"

                            value={
                                name
                            }

                            onChange={

                                (event) =>

                                    setName(

                                        event.target.value

                                    )

                            }

                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-group">

                        <label>

                            Description

                        </label>


                        <textarea

                            placeholder="Enter workspace description"

                            value={
                                description
                            }

                            onChange={

                                (event) =>

                                    setDescription(

                                        event.target.value

                                    )

                            }

                        />

                    </div>


                    {/* ERROR */}

                    {error && (

                        <p className="error-message">

                            {error}

                        </p>

                    )}


                    {/* BUTTON */}

                    <button
                        type="submit"
                    >

                        Create Workspace

                    </button>


                </form>

            </div>


            {/* ========================================
                WORKSPACE LIST
            ======================================== */}

            <div className="workspace-list">

                <h2>

                    Your Workspaces

                </h2>


                {loading ? (

                    <div className="empty-workspace">

                        <p>

                            Loading workspaces...

                        </p>

                    </div>

                ) : workspaces.length === 0 ? (

                    <div className="empty-workspace">

                        <p>

                            You don't have
                            any workspaces yet.

                        </p>

                    </div>

                ) : (

                    <div className="workspace-grid">

                        {workspaces.map(

                            (workspace) => (

                                <div

                                    key={
                                        workspace.id
                                    }

                                    className="workspace-card"

                                >


                                    {/* WORKSPACE ICON */}

                                    <div className="workspace-icon">

                                        📁

                                    </div>


                                    {/* NAME */}

                                    <h3>

                                        {
                                            workspace.name
                                        }

                                    </h3>


                                    {/* DESCRIPTION */}

                                    <p>

                                        {
                                            workspace.description ||

                                            "No description available."

                                        }

                                    </p>


                                    {/* OPEN WORKSPACE */}

                                    <button

                                        onClick={() =>

                                            handleSelectWorkspace(

                                                workspace

                                            )

                                        }

                                    >

                                        Open Workspace

                                    </button>


                                </div>

                            )

                        )}

                    </div>

                )}

            </div>


        </div>

    );

}


export default Workspace;