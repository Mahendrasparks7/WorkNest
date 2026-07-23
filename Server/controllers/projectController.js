const fs = require("fs");
const path = require("path");


// ========================================
// DATABASE PATH
// ========================================

const dbPath =
    path.join(
        __dirname,
        "../data/db.json"
    );


// ========================================
// CREATE PROJECT
// ========================================

const createProject = (req, res) => {

    try {

        const {
            name,
            description,
            workspaceId,
            ownerId
        } = req.body;


        // ========================================
        // VALIDATION
        // ========================================

        if (
            !name ||
            !workspaceId
        ) {

            return res.status(400).json({

                message:
                    "Project name and workspace are required."

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
        // MAKE SURE PROJECTS ARRAY EXISTS
        // ========================================

        if (
            !db.projects
        ) {

            db.projects = [];

        }


        // ========================================
        // CREATE NEW PROJECT
        // ========================================

        const newProject = {

            id:
                Date.now().toString(),

            name:
                name,

            description:
                description || "",

            workspaceId:
                workspaceId,

            ownerId:
                ownerId || "",

            createdAt:
                new Date().toISOString()

        };


        // ========================================
        // ADD PROJECT
        // ========================================

        db.projects.push(
            newProject
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
        // SEND RESPONSE
        // ========================================

        return res.status(201).json({

            message:
                "Project created successfully.",

            project:
                newProject

        });


    } catch (error) {

        console.error(
            "Create Project Error:",
            error
        );


        return res.status(500).json({

            message:
                "Internal server error."

        });

    }

};


// ========================================
// GET PROJECTS BY WORKSPACE
// ========================================

const getProjects = (req, res) => {

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
        // MAKE SURE PROJECTS ARRAY EXISTS
        // ========================================

        if (
            !db.projects
        ) {

            db.projects = [];

        }


        // ========================================
        // FIND PROJECTS
        // ========================================

        const projects =
            db.projects.filter(

                (project) =>

                    project.workspaceId ===
                    workspaceId

            );


        // ========================================
        // SEND PROJECTS
        // ========================================

        return res.status(200).json(

            projects

        );


    } catch (error) {

        console.error(
            "Get Projects Error:",
            error
        );


        return res.status(500).json({

            message:
                "Internal server error."

        });

    }

};


// ========================================
// EXPORT FUNCTIONS
// ========================================

module.exports = {

    createProject,

    getProjects

};