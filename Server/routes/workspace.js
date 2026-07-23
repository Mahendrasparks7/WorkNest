const express = require("express");


const {

    createWorkspace,

    getUserWorkspaces

} = require(

    "../controllers/workspacecontroller"

);


const router =
    express.Router();


// ========================================
// CREATE WORKSPACE
// ========================================

router.post(

    "/",

    createWorkspace

);


// ========================================
// GET USER WORKSPACES
// ========================================

router.get(

    "/user/:ownerId",

    getUserWorkspaces

);


// ========================================
// EXPORT
// ========================================

module.exports =
    router;