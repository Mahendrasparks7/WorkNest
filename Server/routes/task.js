const express = require("express");

const {
    createTask,
    getTasks,
    updateTaskStatus,
    deleteTask
} = require("../controllers/taskController");


const router =
    express.Router();


// ========================================
// CREATE TASK
// ========================================

router.post(
    "/",
    createTask
);


// ========================================
// GET TASKS
// ========================================

router.get(
    "/workspace/:workspaceId",
    getTasks
);


// ========================================
// UPDATE TASK STATUS
// ========================================

router.put(
    "/:taskId/status",
    updateTaskStatus
);


// ========================================
// DELETE TASK
// ========================================

router.delete(
    "/:taskId",
    deleteTask
);


module.exports =
    router;