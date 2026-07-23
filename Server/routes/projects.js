const express = require("express");

const {
    createProject,
    getProjects
} = require("../controllers/projectController");


const router =
    express.Router();


router.post(
    "/",
    createProject
);


router.get(
    "/workspace/:workspaceId",
    getProjects
);


module.exports =
    router;