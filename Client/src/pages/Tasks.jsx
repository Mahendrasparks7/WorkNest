import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import api from "../api/axios";

import "./Tasks.css";


function Tasks() {

    const navigate =
        useNavigate();


    // ========================================
    // TASKS
    // ========================================

    const [
        tasks,
        setTasks
    ] = useState([]);


    // ========================================
    // FORM DATA
    // ========================================

    const [
        formData,
        setFormData
    ] = useState({

        title: "",

        description: "",

        priority: "Medium"

    });


    // ========================================
    // LOADING
    // ========================================

    const [
        loading,
        setLoading
    ] = useState(true);


    // ========================================
    // ERROR
    // ========================================

    const [
        error,
        setError
    ] = useState("");


    // ========================================
    // SELECTED WORKSPACE
    // ========================================

    const [
        workspaceId,
        setWorkspaceId
    ] = useState(

        localStorage.getItem(
            "workspaceId"
        )

    );


    // ========================================
    // HANDLE INPUT
    // ========================================

    const handleChange =
        (event) => {

            const {
                name,
                value
            } = event.target;


            setFormData(

                (previousData) => ({

                    ...previousData,

                    [name]:
                        value

                })

            );

        };


    // ========================================
    // FETCH TASKS
    // ========================================

    const fetchTasks =
        async () => {

            if (!workspaceId) {

                setError(

                    "Please select a workspace first."

                );

                setLoading(false);

                return;

            }


            try {

                setLoading(true);

                setError("");


                const response =
                    await api.get(

                        `/tasks/workspace/${workspaceId}`

                    );


                // Backend response:
                // { tasks: [...] }

                setTasks(

                    response.data.tasks || []

                );


            } catch (error) {

                console.error(

                    "Fetch Tasks Error:",

                    error

                );


                setError(

                    error.response
                        ?.data
                        ?.message ||

                    "Unable to load tasks."

                );


            } finally {

                setLoading(false);

            }

        };


    // ========================================
    // LOAD TASKS
    // ========================================

    useEffect(() => {

        fetchTasks();

    }, [workspaceId]);


    // ========================================
    // CREATE TASK
    // ========================================

    const handleSubmit =
        async (event) => {

            event.preventDefault();


            setError("");


            // ========================================
            // VALIDATE TITLE
            // ========================================

            if (
                !formData.title.trim()
            ) {

                setError(

                    "Please enter a task title."

                );

                return;

            }


            // ========================================
            // CHECK WORKSPACE
            // ========================================

            if (!workspaceId) {

                setError(

                    "Please select a workspace first."

                );

                return;

            }


            try {

                const response =
                    await api.post(

                        "/tasks",

                        {

                            title:
                                formData.title.trim(),

                            description:
                                formData.description.trim(),

                            priority:
                                formData.priority,

                            status:
                                "To Do",

                            workspaceId:
                                workspaceId

                        }

                    );


                // ========================================
                // ADD TASK TO UI
                // ========================================

                setTasks(

                    (previousTasks) => [

                        ...previousTasks,

                        response.data.task

                    ]

                );


                // ========================================
                // CLEAR FORM
                // ========================================

                setFormData({

                    title: "",

                    description: "",

                    priority: "Medium"

                });


            } catch (error) {

                console.error(

                    "Create Task Error:",

                    error

                );


                setError(

                    error.response
                        ?.data
                        ?.message ||

                    "Unable to create task."

                );

            }

        };


    // ========================================
    // UPDATE TASK STATUS
    // ========================================

    const updateStatus =
        async (
            taskId,
            newStatus
        ) => {

            try {

                const response =
                    await api.put(

                        `/tasks/${taskId}/status`,

                        {

                            status:
                                newStatus

                        }

                    );


                setTasks(

                    (previousTasks) =>

                        previousTasks.map(

                            (task) =>

                                task.id === taskId

                                    ?

                                response.data.task

                                    :

                                task

                        )

                );


            } catch (error) {

                console.error(

                    "Update Status Error:",

                    error

                );


                setError(

                    "Unable to update task status."

                );

            }

        };


    // ========================================
    // DELETE TASK
    // ========================================

    const deleteTask =
        async (taskId) => {

            const confirmDelete =
                window.confirm(

                    "Are you sure you want to delete this task?"

                );


            if (!confirmDelete) {

                return;

            }


            try {

                await api.delete(

                    `/tasks/${taskId}`

                );


                setTasks(

                    (previousTasks) =>

                        previousTasks.filter(

                            (task) =>

                                task.id !== taskId

                        )

                );


            } catch (error) {

                console.error(

                    "Delete Task Error:",

                    error

                );


                setError(

                    "Unable to delete task."

                );

            }

        };


    // ========================================
    // TASK FILTERS
    // ========================================

    const todoTasks =
        tasks.filter(

            (task) =>

                task.status ===
                "To Do"

        );


    const inProgressTasks =
        tasks.filter(

            (task) =>

                task.status ===
                "In Progress"

        );


    const completedTasks =
        tasks.filter(

            (task) =>

                task.status ===
                "Completed"

        );


    // ========================================
    // TASK CARD
    // ========================================

    const TaskCard =
        ({ task }) => (

            <div className="task-card">


                <div className="task-card-header">

                    <h3>

                        {
                            task.title
                        }

                    </h3>


                    <button

                        className="delete-task-button"

                        onClick={() =>

                            deleteTask(

                                task.id

                            )

                        }

                    >

                        Delete

                    </button>

                </div>


                {task.description && (

                    <p className="task-description">

                        {
                            task.description
                        }

                    </p>

                )}


                <div className="task-card-footer">


                    <span

                        className={

                            `priority ${
                                task.priority
                                    ?.toLowerCase()
                            }`

                        }

                    >

                        {
                            task.priority
                        }

                    </span>


                    <select

                        value={
                            task.status
                        }

                        onChange={

                            (event) =>

                                updateStatus(

                                    task.id,

                                    event.target.value

                                )

                        }

                    >

                        <option value="To Do">

                            To Do

                        </option>


                        <option value="In Progress">

                            In Progress

                        </option>


                        <option value="Completed">

                            Completed

                        </option>

                    </select>

                </div>

            </div>

        );


    // ========================================
    // RENDER
    // ========================================

    return (

        <div className="tasks-page">


            {/* ========================================
                HEADER
            ======================================== */}

            <div className="tasks-header">


                <div>

                    <h1>

                        My Tasks

                    </h1>


                    <p>

                        Manage your work
                        and stay productive.

                    </p>

                </div>


                <button

                    className="back-button"

                    onClick={() =>

                        navigate(
                            "/workspace"
                        )

                    }

                >

                    ← Workspaces

                </button>


            </div>


            {/* ========================================
                ERROR
            ======================================== */}

            {error && (

                <div className="task-error">

                    {
                        error
                    }

                </div>

            )}


            {/* ========================================
                CREATE TASK
            ======================================== */}

            <div className="create-task-card">


                <h2>

                    Create New Task

                </h2>


                <form

                    onSubmit={
                        handleSubmit
                    }

                >


                    <div className="task-form-row">


                        {/* TITLE */}

                        <div className="task-form-group">

                            <label>

                                Task Title

                            </label>


                            <input

                                type="text"

                                name="title"

                                placeholder="Enter task title"

                                value={
                                    formData.title
                                }

                                onChange={
                                    handleChange
                                }

                            />

                        </div>


                        {/* PRIORITY */}

                        <div className="task-form-group">

                            <label>

                                Priority

                            </label>


                            <select

                                name="priority"

                                value={
                                    formData.priority
                                }

                                onChange={
                                    handleChange
                                }

                            >

                                <option value="Low">

                                    Low

                                </option>


                                <option value="Medium">

                                    Medium

                                </option>


                                <option value="High">

                                    High

                                </option>

                            </select>

                        </div>


                    </div>


                    {/* DESCRIPTION */}

                    <div className="task-form-group">

                        <label>

                            Description

                        </label>


                        <textarea

                            name="description"

                            placeholder="Enter task description"

                            value={
                                formData.description
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    {/* CREATE */}

                    <button

                        type="submit"

                        className="create-task-button"

                    >

                        + Create Task

                    </button>


                </form>

            </div>


            {/* ========================================
                TASK BOARD
            ======================================== */}

            {loading ? (

                <div className="loading">

                    Loading tasks...

                </div>

            ) : (

                <div className="task-board">


                    {/* TO DO */}

                    <div className="task-column">


                        <div className="column-header">

                            <h2>

                                To Do

                            </h2>


                            <span>

                                {
                                    todoTasks.length
                                }

                            </span>

                        </div>


                        <div className="task-list">

                            {todoTasks.length === 0 ? (

                                <p className="empty-message">

                                    No tasks

                                </p>

                            ) : (

                                todoTasks.map(

                                    (task) => (

                                        <TaskCard

                                            key={
                                                task.id
                                            }

                                            task={
                                                task
                                            }

                                        />

                                    )

                                )

                            )}

                        </div>

                    </div>


                    {/* IN PROGRESS */}

                    <div className="task-column">


                        <div className="column-header">

                            <h2>

                                In Progress

                            </h2>


                            <span>

                                {
                                    inProgressTasks.length
                                }

                            </span>

                        </div>


                        <div className="task-list">

                            {inProgressTasks.length === 0 ? (

                                <p className="empty-message">

                                    No tasks

                                </p>

                            ) : (

                                inProgressTasks.map(

                                    (task) => (

                                        <TaskCard

                                            key={
                                                task.id
                                            }

                                            task={
                                                task
                                            }

                                        />

                                    )

                                )

                            )}

                        </div>

                    </div>


                    {/* COMPLETED */}

                    <div className="task-column">


                        <div className="column-header">

                            <h2>

                                Completed

                            </h2>


                            <span>

                                {
                                    completedTasks.length
                                }

                            </span>

                        </div>


                        <div className="task-list">

                            {completedTasks.length === 0 ? (

                                <p className="empty-message">

                                    No tasks

                                </p>

                            ) : (

                                completedTasks.map(

                                    (task) => (

                                        <TaskCard

                                            key={
                                                task.id
                                            }

                                            task={
                                                task
                                            }

                                        />

                                    )

                                )

                            )}

                        </div>

                    </div>


                </div>

            )}


        </div>

    );

}


export default Tasks;