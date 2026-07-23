const fs = require("fs");
const path = require("path");


// ========================================
// DATABASE PATH
// ========================================

const dbPath = path.join(
    __dirname,
    "../data/db.json"
);


// ========================================
// CREATE TASK
// ========================================

const createTask = (req, res) => {

    try {

        const {
            title,
            description,
            status,
            priority,
            workspaceId,
            ownerId
        } = req.body;


        // ========================================
        // VALIDATION
        // ========================================

        if (
            !title ||
            !workspaceId
        ) {

            return res.status(400).json({

                message:
                    "Task title and workspace are required."

            });

        }


        // ========================================
        // READ DATABASE
        // ========================================

        const data =
            fs.readFileSync(
                dbPath,
                "utf-8"
            );


        const db =
            JSON.parse(data);


        // ========================================
        // MAKE SURE TASKS ARRAY EXISTS
        // ========================================

        if (
            !db.tasks
        ) {

            db.tasks = [];

        }


        // ========================================
        // CREATE NEW TASK
        // ========================================

        const newTask = {

            id:
                Date.now().toString(),

            title:
                title,

            description:
                description || "",

            status:
                status || "To Do",

            priority:
                priority || "Medium",

            workspaceId:
                workspaceId,

            ownerId:
                ownerId || "",

            createdAt:
                new Date().toISOString()

        };


        // ========================================
        // ADD TASK
        // ========================================

        db.tasks.push(
            newTask
        );


        // ========================================
        // SAVE DATABASE
        // ========================================

        fs.writeFileSync(

            dbPath,

            JSON.stringify(
                db,
                null,
                2
            )

        );


        // ========================================
        // RESPONSE
        // ========================================

        return res.status(201).json({

            message:
                "Task created successfully.",

            task:
                newTask

        });


    } catch (error) {

        console.error(
            "Create Task Error:",
            error
        );


        return res.status(500).json({

            message:
                "Internal server error."

        });

    }

};


// ========================================
// GET TASKS
// ========================================

const getTasks = (req, res) => {

    try {

        const {
            workspaceId
        } = req.params;


        // ========================================
        // READ DATABASE
        // ========================================

        const data =
            fs.readFileSync(
                dbPath,
                "utf-8"
            );


        const db =
            JSON.parse(data);


        // ========================================
        // MAKE SURE TASKS ARRAY EXISTS
        // ========================================

        if (
            !db.tasks
        ) {

            db.tasks = [];

        }


        // ========================================
        // FILTER TASKS
        // ========================================

        const tasks =
            db.tasks.filter(

                (task) =>

                    task.workspaceId ===
                    workspaceId

            );


        // ========================================
        // RESPONSE
        // ========================================

        return res.status(200).json(

            tasks

        );


    } catch (error) {

        console.error(
            "Get Tasks Error:",
            error
        );


        return res.status(500).json({

            message:
                "Internal server error."

        });

    }

};


// ========================================
// UPDATE TASK STATUS
// ========================================

const updateTaskStatus = (req, res) => {

    try {

        const {
            taskId
        } = req.params;


        const {
            status
        } = req.body;


        if (
            !status
        ) {

            return res.status(400).json({

                message:
                    "Status is required."

            });

        }


        const data =
            fs.readFileSync(
                dbPath,
                "utf-8"
            );


        const db =
            JSON.parse(data);


        const task =
            db.tasks.find(

                (task) =>

                    task.id ===
                    taskId

            );


        if (
            !task
        ) {

            return res.status(404).json({

                message:
                    "Task not found."

            });

        }


        task.status =
            status;


        fs.writeFileSync(

            dbPath,

            JSON.stringify(
                db,
                null,
                2
            )

        );


        return res.status(200).json({

            message:
                "Task status updated.",

            task:
                task

        });


    } catch (error) {

        console.error(
            "Update Task Error:",
            error
        );


        return res.status(500).json({

            message:
                "Internal server error."

        });

    }

};


// ========================================
// DELETE TASK
// ========================================

const deleteTask = (req, res) => {

    try {

        const {
            taskId
        } = req.params;


        const data =
            fs.readFileSync(
                dbPath,
                "utf-8"
            );


        const db =
            JSON.parse(data);


        const taskExists =
            db.tasks.some(

                (task) =>

                    task.id ===
                    taskId

            );


        if (
            !taskExists
        ) {

            return res.status(404).json({

                message:
                    "Task not found."

            });

        }


        db.tasks =
            db.tasks.filter(

                (task) =>

                    task.id !==
                    taskId

            );


        fs.writeFileSync(

            dbPath,

            JSON.stringify(
                db,
                null,
                2
            )

        );


        return res.status(200).json({

            message:
                "Task deleted successfully."

        });


    } catch (error) {

        console.error(
            "Delete Task Error:",
            error
        );


        return res.status(500).json({

            message:
                "Internal server error."

        });

    }

};


// ========================================
// EXPORT
// ========================================

module.exports = {

    createTask,

    getTasks,

    updateTaskStatus,

    deleteTask

};